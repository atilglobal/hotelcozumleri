import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { updateAddress, deleteAddress } from "@/lib/addresses";

export async function PUT(request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const data = await request.json();
    await updateAddress(session.userId, Number(id), data);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    if (err.message === "NOT_FOUND") {
      return NextResponse.json({ message: "Adres bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    await deleteAddress(session.userId, Number(id));
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
