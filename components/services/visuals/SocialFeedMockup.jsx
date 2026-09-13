"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
import { socialImages } from "@/config/serviceImages";

const posts = [
  { title: "Sabah manzarası", likes: "248", ...socialImages.calendar.sunday },
  { title: "SPA deneyimi", likes: "192", ...socialImages.posts.story },
  { title: "Gurme lezzetler", likes: "315", ...socialImages.calendar.friday },
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
            className="rounded-sm overflow-hidden border border-white/10 glass-card-dark"
            {...props}
          >
            <div className="relative aspect-square overflow-hidden">
              <ServiceImage src={post.image} alt={post.alt} sizes="(max-width:768px) 100vw, 300px" />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium heading-on-dark">{post.title}</p>
              <p className="text-xs text-muted-on-dark mt-1">{post.likes} etkileşim</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
