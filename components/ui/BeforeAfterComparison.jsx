"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = "Öncesi",
  afterLabel = "Sonrası",
  beforeCaption,
  afterCaption,
  className,
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    setWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = (e) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10 select-none touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Image src={afterImage} alt={afterCaption || afterLabel} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <div className="relative h-full" style={{ width: width || "100%" }}>
            <Image src={beforeImage} alt={beforeCaption || beforeLabel} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        <div className="absolute inset-y-0 z-10" style={{ left: `${position}%` }}>
          <div className="relative -translate-x-1/2 h-full w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
          <button
            type="button"
            aria-label="Karşılaştırma kaydırıcısı"
            onPointerDown={onPointerDown}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-navy shadow-xl flex items-center justify-center cursor-ew-resize"
          >
            <span className="text-lg leading-none" aria-hidden="true">↔</span>
          </button>
        </div>

        <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-navy/80 text-white text-xs font-semibold backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gold/90 text-navy text-xs font-semibold">
          {afterLabel}
        </span>
      </div>

      {(beforeCaption || afterCaption) && (
        <p className="text-xs text-muted-on-dark text-center">
          {beforeCaption && afterCaption ? `${beforeCaption} · ${afterCaption}` : beforeCaption || afterCaption}
        </p>
      )}
    </div>
  );
}
