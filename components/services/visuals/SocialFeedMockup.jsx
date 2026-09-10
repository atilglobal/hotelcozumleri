"use client";

import { motion, useReducedMotion } from "framer-motion";

const posts = [
  { title: "Sabah manzarası", likes: "248", color: "from-blue/30 to-navy" },
  { title: "SPA deneyimi", likes: "192", color: "from-gold/20 to-navy" },
  { title: "Gurme lezzetler", likes: "315", color: "from-ice/40 to-blue/20" },
];

export default function SocialFeedMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {posts.map((post, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.1 },
            };

        return (
          <Wrapper
            key={post.title}
            className="rounded-sm overflow-hidden border border-navy/10 bg-white shadow-sm"
            {...props}
          >
            <div className={`aspect-square bg-gradient-to-br ${post.color}`} />
            <div className="p-4">
              <p className="text-sm font-medium text-navy">{post.title}</p>
              <p className="text-xs text-gray-light mt-1">{post.likes} etkileşim</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
