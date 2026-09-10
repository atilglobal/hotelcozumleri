import { NextResponse } from "next/server";
import { validateTedarikForm } from "@/lib/validation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data;
    const fileMeta = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const raw = formData.get("payload");
      data = raw ? JSON.parse(String(raw)) : {};

      const files = formData.getAll("files");
      if (files.length) {
        const uploadDir = path.join(process.cwd(), "uploads", "tedarik");
        await mkdir(uploadDir, { recursive: true });

        for (const file of files) {
          if (!(file instanceof File) || !file.size) continue;
          if (!ALLOWED_TYPES.has(file.type)) continue;
          if (file.size > 8 * 1024 * 1024) continue;

          const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          await writeFile(path.join(uploadDir, safeName), buffer);
          fileMeta.push({ name: file.name, stored: safeName, type: file.type, size: file.size });
        }
      }
    } else {
      data = await request.json();
    }

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const errors = validateTedarikForm(data);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { message: "Lütfen formu eksiksiz doldurun.", errors },
        { status: 400 }
      );
    }

    const { saveFormSubmission } = await import("@/lib/forms-persist");
    await saveFormSubmission({
      formType: "procurement_request",
      fullName: data.contactName,
      email: data.email,
      phone: data.phone,
      hotelName: data.companyName,
      city: data.city,
      message: data.notes,
      payload: { ...data, files: fileMeta },
    });

    return NextResponse.json({
      success: true,
      message: "Tedarik talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
    });
  } catch {
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
