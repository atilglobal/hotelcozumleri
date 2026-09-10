import { hotelioAI } from "@/config/hotelio";

export default function HotelioAIComparison({ className = "" }) {
  const { comparison } = hotelioAI;

  return (
    <div className={className}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-bold tracking-wider text-white/45 uppercase mb-2">
            {comparison.general.title}
          </p>
          <p className="text-sm text-white/65 leading-relaxed">{comparison.general.text}</p>
        </div>
        <div className="rounded-xl border border-gold/30 bg-gold/[0.08] p-4">
          <p className="text-[10px] font-bold tracking-wider text-gold-light uppercase mb-2">
            {comparison.hotelio.title}
          </p>
          <p className="text-sm text-white/85 leading-relaxed">{comparison.hotelio.text}</p>
        </div>
      </div>
      <p className="text-xs text-white/50 mt-3 leading-relaxed">{comparison.footnote}</p>
    </div>
  );
}
