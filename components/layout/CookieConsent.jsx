"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="max-w-3xl mx-auto glass-card-dark backdrop-blur-xl rounded-2xl shadow-[var(--shadow-card)] p-5 md:p-6">
        {!showPrefs ? (
          <>
            <p className="text-sm text-body-on-dark leading-relaxed">
              Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Zorunlu çerezler site işlevselliği için gereklidir.
              Detaylar için{" "}
              <Link href="/cerez-politikasi" className="text-gold-light hover:underline">Çerez Politikası</Link>
              {" "}sayfamızı inceleyebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <button type="button" onClick={() => save(defaultPrefs)} className="px-4 py-2 text-sm border border-white/15 rounded-lg text-body-on-dark hover:bg-white/5 transition-colors">
                Yalnızca Zorunlu
              </button>
              <button type="button" onClick={() => setShowPrefs(true)} className="px-4 py-2 text-sm border border-white/15 rounded-lg text-body-on-dark hover:bg-white/5 transition-colors">
                Tercihleri Yönet
              </button>
              <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="px-4 py-2 text-sm bg-blue text-white rounded-lg hover:bg-blue-bright">
                Tümünü Kabul Et
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display text-lg heading-on-dark mb-4">Çerez Tercihleri</h2>
            <div className="space-y-4 text-sm text-body-on-dark">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <span><strong className="heading-on-dark">Zorunlu</strong> — Site güvenliği ve temel işlevler için gereklidir.</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} className="mt-1" />
                <span><strong className="heading-on-dark">Analitik</strong> — Ziyaret istatistiklerini anonim olarak toplar.</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} className="mt-1" />
                <span><strong className="heading-on-dark">Pazarlama</strong> — Kişiselleştirilmiş içerik ve reklam için kullanılır.</span>
              </label>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              <button type="button" onClick={() => save(prefs)} className="px-4 py-2 text-sm bg-blue text-white rounded-lg hover:bg-blue-bright">
                Tercihleri Kaydet
              </button>
              <button type="button" onClick={() => setShowPrefs(false)} className="px-4 py-2 text-sm border border-white/15 rounded-lg text-body-on-dark">
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
