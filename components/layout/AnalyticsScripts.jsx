"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "hc_cookie_consent";

export default function AnalyticsScripts() {
  const [enabled, setEnabled] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const prefs = JSON.parse(raw);
        setEnabled({ analytics: !!prefs.analytics, marketing: !!prefs.marketing });
      } catch { /* ignore */ }
    };
    load();
    window.addEventListener("hc-cookie-consent", load);
    return () => window.removeEventListener("hc-cookie-consent", load);
  }, []);

  if (!enabled.analytics && !enabled.marketing) return null;

  return null;
}
