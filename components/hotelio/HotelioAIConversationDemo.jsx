"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { hotelioAI } from "@/config/hotelio";
import { cn } from "@/utils/cn";

const NAV_ITEMS = ["Dashboard", "Rezervasyon", "Ön Büro", "Raporlar", "AI Asistan"];

export function findAIConversation(prompt) {
  return (
    hotelioAI.conversations.find((c) => c.prompt === prompt) ||
    hotelioAI.conversations[0]
  );
}

export default function HotelioAIConversationDemo({ prompt, className }) {
  const prefersReducedMotion = useReducedMotion();
  const conversation = findAIConversation(prompt);

  const [phase, setPhase] = useState("ready");
  const [visibleChars, setVisibleChars] = useState(conversation.response.length);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("ready");
      setVisibleChars(conversation.response.length);
      return;
    }

    setPhase("question");
    setVisibleChars(0);

    const thinkTimer = setTimeout(() => setPhase("thinking"), 400);
    const answerTimer = setTimeout(() => setPhase("typing"), 1200);

    return () => {
      clearTimeout(thinkTimer);
      clearTimeout(answerTimer);
    };
  }, [prompt, prefersReducedMotion, conversation.response]);

  useEffect(() => {
    if (phase !== "typing" || prefersReducedMotion) return;

    if (visibleChars >= conversation.response.length) {
      setPhase("ready");
      return;
    }

    const timer = setTimeout(() => setVisibleChars((n) => n + 1), 18);
    return () => clearTimeout(timer);
  }, [phase, visibleChars, conversation.response.length, prefersReducedMotion]);

  const displayedResponse = conversation.response.slice(0, visibleChars);

  return (
    <div className={cn("rounded-2xl overflow-hidden border border-white/10 bg-[#070f1a] shadow-[0_32px_80px_rgba(0,0,0,0.45)]", className)}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#050b14]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="flex-1 text-center text-[10px] text-white/40 truncate">app.hotelio.com.tr / ai-asistan</span>
        <span className="text-[10px] font-bold tracking-wider text-gold">HOTELIO AI</span>
      </div>

      <div className="grid md:grid-cols-[140px_1fr] min-h-[320px]">
        <aside className="hidden md:block border-r border-white/[0.06] bg-[#0a1422] p-3">
          <p className="text-[9px] font-bold tracking-wider text-white/35 uppercase mb-3">Hotelio</p>
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <li
                key={item}
                className={cn(
                  "text-[10px] px-2 py-1.5 rounded-md",
                  item === "AI Asistan" ? "bg-gold/15 text-gold-light font-semibold" : "text-white/45"
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-4 md:p-5 flex flex-col">
          <div className="flex-1 space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[90%] rounded-xl rounded-tr-sm bg-white/[0.06] border border-white/10 px-3 py-2.5">
                <p className="text-[9px] text-white/45 mb-1 uppercase tracking-wider">Kullanıcı</p>
                <p className="text-sm text-white/85 leading-relaxed">{conversation.prompt}</p>
              </div>
            </div>

            {phase === "thinking" && (
              <div className="flex items-center gap-2 text-xs text-gold-light/80">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70 animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70 animate-pulse [animation-delay:300ms]" />
                </span>
                Hotelio AI düşünüyor...
              </div>
            )}

            {(phase === "typing" || phase === "ready") && (
              <div className="max-w-[95%] rounded-xl rounded-tl-sm bg-gold/[0.08] border border-gold/20 px-3 py-2.5">
                <p className="text-[9px] text-gold mb-1 uppercase tracking-wider font-bold">Hotelio AI</p>
                <p className="text-sm text-white/85 leading-relaxed min-h-[4.5rem]">
                  {displayedResponse}
                  {phase === "typing" && (
                    <span className="inline-block w-0.5 h-4 ml-0.5 bg-gold/80 align-middle animate-pulse" />
                  )}
                </p>
              </div>
            )}
          </div>

          <p className="text-[10px] text-white/35 mt-4 pt-3 border-t border-white/[0.06]">{hotelioAI.demoNote}</p>
        </div>
      </div>
    </div>
  );
}

export function HotelioAIPromptChips({ activePrompt, onSelect, className }) {
  return (
    <div className={className}>
      <p className="text-sm font-semibold text-white/80 mb-3">{hotelioAI.demoTitle}</p>
      <div className="flex flex-wrap gap-2">
        {hotelioAI.promptChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSelect(chip)}
            className={cn(
              "text-left text-xs md:text-sm px-3 py-2 rounded-xl border transition-all duration-200",
              activePrompt === chip
                ? "border-gold/45 bg-gold/12 text-gold-light shadow-[0_0_20px_rgba(212,168,83,0.12)]"
                : "border-white/12 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white/85"
            )}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
