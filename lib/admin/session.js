import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "hc_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET || "dev-admin-session-secret";
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(payload) {
  const token = await new SignJWT({ ...payload, type: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  return token;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.type !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, maxAge: 0, path: "/" });
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session?.adminId) throw new Error("UNAUTHORIZED");
  return session;
}

export { COOKIE_NAME as ADMIN_COOKIE_NAME };
