import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const CUSTOMER_COOKIE = "hc_session";
const ADMIN_COOKIE = "hc_admin_session";

function getSecret(isAdmin = false) {
  const secret = isAdmin
    ? (process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET || "dev-admin-session-secret")
    : (process.env.SESSION_SECRET || "dev-session-secret-change-in-production");
  return new TextEncoder().encode(secret);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      const { payload } = await jwtVerify(token, getSecret(true));
      if (payload.type !== "admin") throw new Error("invalid");
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Customer protected routes
  const customerProtected = ["/hesabim", "/odeme"];
  const isProtected = customerProtected.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(CUSTOMER_COOKIE)?.value;
  if (!token) {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getSecret(false));
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/hesabim/:path*", "/odeme", "/odeme/:path*"],
};
