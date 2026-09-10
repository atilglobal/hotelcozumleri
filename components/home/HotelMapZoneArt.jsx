/** Bölge kutuları için dekoratif mini illüstrasyonlar */

const stroke = "rgba(255,255,255,0.35)";
const strokeSoft = "rgba(255,255,255,0.18)";
const fillSoft = "rgba(255,255,255,0.06)";
const gold = "rgba(212,168,83,0.55)";
const blue = "rgba(91,138,255,0.45)";

function ArtWrapper({ cx, cy, scale, opacity, active, children }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={active ? opacity + 0.15 : opacity}>
      {children}
    </g>
  );
}

function SecurityArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <path d="M0 -18 L14 -10 V4 C14 14 0 22 0 22 C0 22 -14 14 -14 4 V-10 Z" stroke={stroke} strokeWidth="1.4" fill={fillSoft} />
      <rect x="-5" y="-2" width="10" height="9" rx="1.5" stroke={gold} strokeWidth="1.2" fill="none" />
      <circle cy="4" r="1.2" fill={gold} />
    </ArtWrapper>
  );
}

function ReceptionArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <rect x="-22" y="-4" width="44" height="14" rx="2" stroke={stroke} strokeWidth="1.3" fill={fillSoft} />
      <path d="M-22 10 H22" stroke={strokeSoft} strokeWidth="1.2" />
      <path d="M-8 -14 C-8 -20 8 -20 8 -14 V-4 H-8 Z" stroke={gold} strokeWidth="1.2" fill="rgba(212,168,83,0.12)" />
      <circle cx="14" cy="-8" r="3" stroke={blue} strokeWidth="1" fill="none" />
    </ArtWrapper>
  );
}

function ManagementArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <rect x="-16" y="-14" width="32" height="26" rx="2" stroke={stroke} strokeWidth="1.2" fill={fillSoft} />
      <rect x="-10" y="2" width="5" height="8" fill={blue} opacity="0.7" />
      <rect x="-2" y="-4" width="5" height="14" fill={gold} opacity="0.7" />
      <rect x="6" y="-8" width="5" height="18" fill={blue} opacity="0.5" />
    </ArtWrapper>
  );
}

function RoomsArt({ cx, cy, scale, opacity, active, h }) {
  const count = h > 200 ? 4 : 2;
  const step = h > 200 ? 52 : 36;
  const startY = cy - ((count - 1) * step) / 2 + 10;

  return (
    <g opacity={active ? opacity + 0.15 : opacity}>
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`translate(${cx}, ${startY + i * step}) scale(${scale * 0.9})`}>
          <rect x="-20" y="-8" width="40" height="22" rx="2" stroke={stroke} strokeWidth="1.2" fill={fillSoft} />
          <rect x="-16" y="-12" width="32" height="8" rx="1.5" stroke={strokeSoft} strokeWidth="1" fill="rgba(255,255,255,0.04)" />
          <path d="M-8 14 H8" stroke={gold} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function ProcurementArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <rect x="-14" y="-10" width="18" height="18" rx="2" stroke={stroke} strokeWidth="1.2" fill={fillSoft} />
      <rect x="0" y="-6" width="16" height="14" rx="2" stroke={gold} strokeWidth="1.2" fill="rgba(212,168,83,0.08)" />
      <path d="M-6 12 L-2 6 L2 10 L8 2" stroke={blue} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </ArtWrapper>
  );
}

function RestaurantArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <circle r="14" stroke={stroke} strokeWidth="1.3" fill={fillSoft} />
      <circle r="8" stroke={gold} strokeWidth="1" fill="none" opacity="0.8" />
      <path d="M-18 -6 V10 M-20 -6 H-16 M-18 10 H-16" stroke={strokeSoft} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M18 -6 C18 2 16 6 16 10 M16 -6 H20" stroke={strokeSoft} strokeWidth="1.1" strokeLinecap="round" />
    </ArtWrapper>
  );
}

function SpaArt({ cx, cy, scale, opacity, active, h }) {
  return (
    <g opacity={active ? opacity + 0.15 : opacity} transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <path
        d="M0 -28 C12 -18 12 -2 0 8 C-12 -2 -12 -18 0 -28 Z"
        stroke={stroke}
        strokeWidth="1.3"
        fill={fillSoft}
      />
      <path d="M-18 12 Q0 2 18 12" stroke={blue} strokeWidth="1.3" fill="none" opacity="0.7" />
      <path d="M-14 22 Q0 14 14 22" stroke={blue} strokeWidth="1" fill="none" opacity="0.45" />
      {h > 200 && (
        <>
          <circle cy="32" r="4" stroke={gold} strokeWidth="1" fill="rgba(212,168,83,0.15)" />
          <path d="M-8 38 Q0 32 8 38" stroke={strokeSoft} strokeWidth="1" fill="none" />
        </>
      )}
    </g>
  );
}

function HousekeepingArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <rect x="-10" y="-12" width="20" height="24" rx="2" stroke={stroke} strokeWidth="1.2" fill={fillSoft} />
      <rect x="-14" y="6" width="28" height="8" rx="2" stroke={gold} strokeWidth="1.1" fill="rgba(212,168,83,0.1)" />
      <circle cx="-6" cy="10" r="2.5" fill={blue} opacity="0.6" />
      <circle cx="4" cy="10" r="2.5" fill={blue} opacity="0.6" />
      <path d="M6 -16 L10 -22 L14 -16" stroke={strokeSoft} strokeWidth="1.1" strokeLinecap="round" />
    </ArtWrapper>
  );
}

function DigitalArt({ cx, cy, scale, opacity, active }) {
  return (
    <ArtWrapper cx={cx} cy={cy} scale={scale} opacity={opacity} active={active}>
      <rect x="-24" y="-16" width="48" height="30" rx="3" stroke={stroke} strokeWidth="1.3" fill={fillSoft} />
      <rect x="-18" y="-10" width="36" height="18" rx="1.5" fill="rgba(91,138,255,0.12)" stroke={blue} strokeWidth="0.8" />
      <path d="M0 14 V18 M-8 18 H8" stroke={strokeSoft} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28 -6 C32 -2 32 4 28 8 M32 -2 C36 2 36 6 32 10 M36 2 C40 6 40 10 36 14" stroke={gold} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </ArtWrapper>
  );
}

const zoneLabels = {
  security: "GÜVENLİK",
  reception: "RESEPSİYON",
  management: "YÖNETİM",
  rooms: "ODALAR",
  procurement: "SATIN ALMA",
  restaurant: "RESTORAN",
  spa: "SPA",
  housekeeping: "HK",
  digital: "DİJİTAL",
};

export function getZoneLabel(id) {
  return zoneLabels[id] ?? id.toUpperCase();
}

export default function HotelMapZoneArt({ id, zone, active }) {
  const { cx, cy } = { cx: zone.x + zone.w / 2, cy: zone.y + zone.h / 2 + 6 };
  const opacity = 0.32;
  const scale = Math.min(zone.w, zone.h) / 130;

  const props = { cx, cy, scale, opacity, active, h: zone.h };

  switch (id) {
    case "security":
      return <SecurityArt {...props} />;
    case "reception":
      return <ReceptionArt {...props} />;
    case "management":
      return <ManagementArt {...props} />;
    case "rooms":
      return <RoomsArt {...props} cx={zone.x + zone.w / 2} cy={zone.y + zone.h / 2} />;
    case "procurement":
      return <ProcurementArt {...props} />;
    case "restaurant":
      return <RestaurantArt {...props} />;
    case "spa":
      return <SpaArt {...props} cy={zone.y + zone.h / 2 + 8} />;
    case "housekeeping":
      return <HousekeepingArt {...props} cy={zone.y + zone.h / 2 + 4} />;
    case "digital":
      return <DigitalArt {...props} cy={zone.y + zone.h / 2 + 6} />;
    default:
      return null;
  }
}
