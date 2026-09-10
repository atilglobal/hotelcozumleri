import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { getAllLegalPages, updateLegalPage } from "@/lib/legal";

export const GET = withAdmin(async () => {
  const pages = await getAllLegalPages();
  return NextResponse.json({ pages });
});

export const PUT = withAdmin(async (request) => {
  const data = await request.json();
  if (!data.slug) {
    return NextResponse.json({ message: "Slug gereklidir." }, { status: 400 });
  }
  await updateLegalPage(data.slug, { title: data.title, content: data.content });
  return NextResponse.json({ success: true });
});
