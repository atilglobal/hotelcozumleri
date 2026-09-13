"use client";

import { hotelioAI } from "@/config/hotelio";

const RADIUS = 108;

function polar(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * RADIUS, y: Math.sin(rad) * RADIUS };
}

const nodes = hotelioAI.focusAreas.map((label, i) => {
  const angle = -90 + (360 / hotelioAI.focusAreas.length) * i;
  return { label, ...polar(angle) };
});

export default function HotelioAIOrbitGraphic({ className = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-[360px] ${className}`}>
      <div className="relative aspect-square">
        <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="140" cy="140" r="118" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
          <circle cx="140" cy="140" r="88" stroke="rgba(212,168,83,0.15)" strokeWidth="1" fill="none" />
          {nodes.map((node, i) => (
            <line
              key={node.label}
              x1="140"
              y1="140"
              x2={140 + node.x * 0.92}
              y2={140 + node.y * 0.92}
              stroke="url(#aiOrbitLine)"
              strokeWidth="1"
              opacity="0.45"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              className="orbit-connector"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <defs>
            <linearGradient id="aiOrbitLine" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#d4a853" stopOpacity="0.3" />
              <stop offset="1" stopColor="#5b8aff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle cx="140" cy="140" r="34" fill="rgba(212,168,83,0.12)" stroke="rgba(212,168,83,0.35)" strokeWidth="1.5" />
          <text x="140" y="136" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9" fontWeight="700">
            HOTELIO
          </text>
          <text x="140" y="150" textAnchor="middle" fill="rgba(212,168,83,0.9)" fontSize="9" fontWeight="700">
            AI
          </text>
        </svg>

        <div className="absolute inset-0">
          {nodes.map((node) => {
            const left = 50 + (node.x / 280) * 100;
            const top = 50 + (node.y / 280) * 100;
            return (
              <div
                key={node.label}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="inline-block px-2 py-1 rounded-md text-[9px] font-semibold text-white/75 bg-navy/85 border border-white/10 whitespace-nowrap max-w-[72px] truncate">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-[11px] text-white/45 leading-relaxed px-4 mt-4">{hotelioAI.orbitCaption}</p>
    </div>
  );
}
