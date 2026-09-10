import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/auth";

export async function POST() {
  try {
    await logoutUser();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
