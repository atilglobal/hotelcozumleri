import { NextResponse } from "next/server";
import { verifyCallback } from "@/lib/payments";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());
    const result = await verifyCallback("iyzico", payload);
    const siteUrl = process.env.SITE_URL || "";
    if (result.redirect) {
      const url = result.failed
        ? `${siteUrl}/odeme/basarisiz?order=${result.orderId}`
        : `${siteUrl}/odeme/basarili?order=${result.orderId}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.json({ ok: result.ok });
  } catch (err) {
    console.error("[iyzico-callback]", err.message);
    return NextResponse.redirect(`${process.env.SITE_URL || ""}/odeme/basarisiz`);
  }
}
