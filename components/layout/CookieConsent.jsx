"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "hc_cookie_consent";

const defaultPrefs = { necessary: true, analytics: false, marketing: false };

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    queueMicrotask(() => {
      setVisible(!loadPrefs());
      setReady(true);
    });
  }, []);

  const save = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...next, updatedAt: Date.now() }));
    window.dispatchEvent(new CustomEvent("hc-cookie-consent", { detail: next }));
    setVisible(false);
    setShowPrefs(false);
  };

  if (!ready || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6" role="dialog" aria-label="Çerez tercihleri">
      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-[var(--shadow-card)] border border-navy/8 p-5 md:p-6">
        {!showPrefs ? (
          <>
            <p className="text-sm text-navy leading-relaxed">
              Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Zorunlu çerezler site işlevselliği için gereklidir.
              Detaylar için{" "}
              <Link href="/cerez-politikasi" className="text-blue hover:underline">Çerez Politikası</Link>
              {" "}sayfamızı inceleyebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <button type="button" onClick={() => save(defaultPrefs)} className="px-4 py-2 text-sm border border-navy/20 rounded hover:bg-navy/5">
                Yalnızca Zorunlu
              </button>
              <button type="button" onClick={() => setShowPrefs(true)} className="px-4 py-2 text-sm border border-navy/20 rounded hover:bg-navy/5">
                Tercihleri Yönet
              </button>
              <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="px-4 py-2 text-sm bg-blue text-white rounded hover:bg-blue-bright">
                Tümünü Kabul Et
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display text-lg text-navy mb-4">Çerez Tercihleri</h2>
            <div className="space-y-4 text-sm">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <span><strong>Zorunlu</strong> — Site güvenliği ve temel işlevler için gereklidir.</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} className="mt-1" />
                <span><strong>Analitik</strong> — Ziyaret istatistiklerini anonim olarak toplar.</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} className="mt-1" />
                <span><strong>Pazarlama</strong> — Kişiselleştirilmiş içerik ve reklam için kullanılır.</span>
              </label>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              <button type="button" onClick={() => save(prefs)} className="px-4 py-2 text-sm bg-blue text-white rounded hover:bg-blue-bright">
                Tercihleri Kaydet
              </button>
              <button type="button" onClick={() => setShowPrefs(false)} className="px-4 py-2 text-sm border border-navy/20 rounded">
                Geri
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function useCookieConsent() {
  const [prefs, setPrefs] = useState(() => loadPrefs() || defaultPrefs);
  useEffect(() => {
    const handler = (e) => setPrefs(e.detail);
    window.addEventListener("hc-cookie-consent", handler);
    return () => window.removeEventListener("hc-cookie-consent", handler);
  }, []);
  return prefs;
}
