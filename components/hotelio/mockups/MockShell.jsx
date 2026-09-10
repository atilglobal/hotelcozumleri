import { cn } from "@/utils/cn";

export default function MockShell({ title = "HOTELIO", path = "app.hotelio.com.tr", children, className, compact = false, theme = "dark" }) {
  const isLight = theme === "light";
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
        isLight ? "border-slate-200 bg-[#f1f5f9]" : "border-white/10 bg-[#0c1829]",
        className
      )}
    >
      <div className={cn("flex items-center gap-2 px-3 py-2 border-b", isLight ? "bg-[#0f172a] border-white/5" : "bg-[#071018] border-white/[0.06]")}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className={cn("text-[9px] md:text-[10px] truncate max-w-[200px]", isLight ? "text-white/40" : "text-white/40")}>{path}</span>
        </div>
        <span className="text-gold text-[9px] font-bold tracking-[0.2em]">{title}</span>
      </div>
      <div className={cn("p-3 md:p-4", compact && "p-2 md:p-3")}>{children}</div>
    </div>
  );
}
