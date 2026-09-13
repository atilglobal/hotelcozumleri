import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { withAdmin } from "@/lib/admin/api";

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export const GET = withAdmin(async (_request, context) => {
  const { filename } = await context.params;
  const safe = path.basename(filename);
  if (!safe || safe !== filename) {
    return NextResponse.json({ message: "Geçersiz dosya." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "uploads", "decor", safe);
  try {
    const buffer = await readFile(filePath);
    const ext = path.extname(safe).toLowerCase();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ message: "Dosya bulunamadı." }, { status: 404 });
  }
});
