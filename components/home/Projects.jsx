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

  if (!projects.enabled || !projects.items?.length) {
    return null;
  }

  return (
    <section className="section-padding section-dark-d relative overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle title={projects.title} subtitle={projects.subtitle} className="mb-0" />
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
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 ring-1 ring-navy/8">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl text-navy mb-1 group-hover:text-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-light mb-3">{project.service}</p>
                </Link>
              </CardWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
