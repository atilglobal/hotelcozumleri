import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { getDashboardStats } from "@/lib/admin/dashboard";

export const GET = withAdmin(async () => {
  const stats = await getDashboardStats();
  return NextResponse.json(stats);
});
