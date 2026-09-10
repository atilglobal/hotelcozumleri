import { hotelioAI } from "@/config/hotelio";

export default function HotelioAIFocusAreas() {
  return (
    <div>
      <h3 className="heading-on-dark text-xl md:text-2xl font-bold mb-2">{hotelioAI.focusTitle}</h3>
      <p className="text-body-on-dark text-sm mb-6 max-w-2xl">{hotelioAI.focusSubtitle}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {hotelioAI.focusAreas.map((area) => (
          <div
            key={area}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center hover:border-gold/25 hover:bg-gold/[0.06] transition-colors"
          >
            <span className="text-[11px] md:text-xs font-semibold text-white/80 tracking-wide uppercase">
              {area}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
