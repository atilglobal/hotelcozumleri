import { NextResponse } from "next/server";
import { verifyCallback } from "@/lib/payments";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());
    const result = await verifyCallback("paytr", payload);
    if (!result.ok) {
      console.error("[paytr-callback]", result.error);
      return new NextResponse("OK", { status: 200 });
    }
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("[paytr-callback]", err.message);
    return new NextResponse("OK", { status: 200 });
  }
}
