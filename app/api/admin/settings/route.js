import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { getSettingsByGroup, setSetting, clearSettingsCache } from "@/lib/settings";
import { logAudit } from "@/lib/audit";

export const GET = withAdmin(async (request) => {
  const group = new URL(request.url).searchParams.get("group") || "general";
  const settings = await getSettingsByGroup(group);
  const siteUrl = process.env.SITE_URL || "https://hotelcozumleri.com";
  const callbacks = {
    paytr: `${siteUrl}/api/payments/paytr/callback`,
    iyzico: `${siteUrl}/api/payments/iyzico/callback`,
  };
  return NextResponse.json({ settings, callbacks });
});

export const PUT = withAdmin(async (request, _ctx, session) => {
  const { group, settings } = await request.json();
  for (const [key, val] of Object.entries(settings)) {
    const isSecret = /secret|key|salt|password/i.test(key);
    await setSetting(group, key, val.value ?? val, val.type || (typeof val === "boolean" ? "boolean" : "string"), val.isPublic ?? false);
    if (!isSecret) {
      await logAudit({ adminUserId: session.adminId, action: "setting_updated", entityType: "settings", metadata: { group, key } });
    }
  }
  clearSettingsCache();
  return NextResponse.json({ success: true });
});
