"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function MiniChart({ data, color = "#1E5BA8", height = 60, animated = true }) {
  const max = Math.max(...data);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-end gap-0.5 md:gap-1" style={{ height }}>
      {data.map((value, i) => {
        const bar = (
          <div
            className="flex-1 rounded-sm min-h-[3px]"
            style={{
              height: `${(value / max) * 100}%`,
              background: `linear-gradient(to top, ${color}, ${color}88)`,
            }}
          />
        );
        if (animated && !prefersReducedMotion) {
          return (
            <motion.div
              key={i}
              className="flex-1 flex items-end h-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              style={{ originY: 1 }}
            >
              {bar}
            </motion.div>
          );
        }
        return <div key={i} className="flex-1 flex items-end h-full">{bar}</div>;
      })}
    </div>
  );
}
