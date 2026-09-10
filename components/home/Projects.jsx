"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            title={projects.title}
            subtitle={projects.subtitle}
            className="mb-0"
          />
          <Button href="/projeler" variant="outline" size="md" className="shrink-0">
            Tüm Projeler
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {projects.items.map((project, index) => {
            const CardWrapper = prefersReducedMotion ? "div" : motion.div;
            const cardProps = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-40px" },
                  transition: { duration: 0.6, delay: index * 0.1 },
                };

            return (
              <CardWrapper key={project.id} {...cardProps}>
                <Link href={project.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-navy text-xs font-medium px-3 py-1 rounded-sm">
                        {project.city}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-navy mb-1 group-hover:text-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-light mb-3">{project.service}</p>
                  <span className="text-sm text-blue font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detayları Gör <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </CardWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
