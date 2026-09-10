/** Otel ekosistemi haritası — viewBox 800×560 koordinatları */
export const MAP_VIEW = { width: 800, height: 560 };

export const hotelMapZones = [
  { id: "security", x: 52, y: 68, w: 128, h: 108 },
  { id: "reception", x: 196, y: 68, w: 218, h: 108 },
  { id: "management", x: 430, y: 68, w: 118, h: 108 },
  { id: "rooms", x: 564, y: 68, w: 188, h: 392 },
  { id: "procurement", x: 52, y: 188, w: 128, h: 108 },
  { id: "restaurant", x: 196, y: 188, w: 218, h: 108 },
  { id: "spa", x: 430, y: 188, w: 118, h: 272 },
  { id: "housekeeping", x: 52, y: 308, w: 128, h: 152 },
  { id: "digital", x: 196, y: 308, w: 218, h: 152 },
];

export function zoneCenter(zone) {
  return { cx: zone.x + zone.w / 2, cy: zone.y + zone.h / 2 };
}
