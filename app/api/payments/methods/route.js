import { NextResponse } from "next/server";
import { getActivePaymentMethods } from "@/lib/payments";

export async function GET() {
  try {
    const methods = await getActivePaymentMethods();
    return NextResponse.json({ methods });
  } catch {
    return NextResponse.json({ methods: [] });
  }
}
