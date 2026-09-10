"use client";

import { hotelMapZones, MAP_VIEW, zoneCenter } from "@/config/hotelMap";
import HotelMapZoneArt, { getZoneLabel } from "@/components/home/HotelMapZoneArt";

export default function HotelEcosystemMap({ areas, activeId, onAreaChange, className }) {
  const areaById = Object.fromEntries(areas.map((a) => [a.id, a]));

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Otel ekosistemi haritası"
    >
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="800" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#151d32" />
          <stop offset="1" stopColor="#0c1222" />
        </linearGradient>
        <linearGradient id="zoneFill" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3b6cf4" stopOpacity="0.1" />
          <stop offset="1" stopColor="#d4a853" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="zoneActive" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3b6cf4" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d4a853" stopOpacity="0.18" />
        </linearGradient>
        <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <clipPath id="buildingClip">
          <rect x="40" y="50" width="720" height="460" rx="16" />
        </clipPath>
      </defs>

      <rect width="800" height="560" fill="url(#mapBg)" />
      <rect width="800" height="560" fill="url(#mapGrid)" />

      <rect
        x="40"
        y="50"
        width="720"
        height="460"
        rx="16"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
        fill="rgba(255,255,255,0.02)"
      />

      <path
        d="M564 50 V510 M430 50 V510 M196 50 V510 M40 188 H564 M40 308 H564"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
      />

      <g clipPath="url(#buildingClip)">
        {hotelMapZones.map((zone) => {
          const area = areaById[zone.id];
          if (!area) return null;
          const isActive = activeId === zone.id;

          return (
            <g key={`art-${zone.id}`} pointerEvents="none">
              <HotelMapZoneArt id={zone.id} zone={zone} active={isActive} />
            </g>
          );
        })}
      </g>

      {hotelMapZones.map((zone) => {
        const area = areaById[zone.id];
        if (!area) return null;
        const isActive = activeId === zone.id;
        const { cx, cy } = zoneCenter(zone);

        return (
          <g
            key={zone.id}
            role="button"
            tabIndex={0}
            className="cursor-pointer outline-none"
            onMouseEnter={() => onAreaChange(zone.id)}
            onMouseLeave={() => onAreaChange(null)}
            onFocus={() => onAreaChange(zone.id)}
            onBlur={() => onAreaChange(null)}
            onClick={() => onAreaChange(isActive ? null : zone.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAreaChange(isActive ? null : zone.id);
              }
            }}
          >
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.w}
              height={zone.h}
              rx="8"
              fill={isActive ? "url(#zoneActive)" : "url(#zoneFill)"}
              stroke={isActive ? "rgba(212,168,83,0.55)" : "rgba(255,255,255,0.1)"}
              strokeWidth={isActive ? 1.5 : 1}
            />

            <text
              x={zone.x + 10}
              y={zone.y + 16}
              fill={isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)"}
              fontSize="7.5"
              fontWeight="600"
              letterSpacing="0.06em"
            >
              {getZoneLabel(zone.id)}
            </text>

            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 18 : 14}
              fill="rgba(12,18,34,0.85)"
              stroke={isActive ? "#d4a853" : "rgba(255,255,255,0.7)"}
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="3" fill="#d4a853" opacity={isActive ? 1 : 0.85} />

            {isActive && (
              <>
                <rect x={cx - 54} y={cy + 18} width="108" height="24" rx="6" fill="#d4a853" />
                <text x={cx} y={cy + 34} textAnchor="middle" fill="#0c1222" fontSize="10" fontWeight="700">
                  {area.name}
                </text>
              </>
            )}
          </g>
        );
      })}

      <path
        d="M100 510 L140 472 L180 510"
        stroke="rgba(212,168,83,0.45)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <text x="140" y="528" textAnchor="middle" fill="rgba(212,168,83,0.55)" fontSize="9" fontWeight="600">
        GİRİŞ
      </text>

      <g transform="translate(720, 72)">
        <circle r="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <path d="M0 -9 L2.5 0 L0 9 L-2.5 0 Z" fill="rgba(212,168,83,0.65)" />
        <text y="26" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">
          N
        </text>
      </g>
    </svg>
  );
}
