import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const dbConfigured = Boolean(getPool());

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: dbConfigured ? "configured" : "not_configured",
  });
}
