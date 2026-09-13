import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function ServiceSection({
  eyebrow,
  title,
  description,
  children,
  variant = "a",
  sectionClass = "section-dark-a",
  className,
  headerClassName,
  id,
}) {
  return (
    <section id={id} className={cn("section-padding relative overflow-hidden", sectionClass, className)}>
      <SectionBackdrop variant={variant} />
      <Container className="relative z-10">
        {(eyebrow || title) && (
          <AnimatedText className={cn("max-w-2xl mx-auto mb-10 md:mb-14", headerClassName || "text-center")}>
            {eyebrow && (
              <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">{title}</h2>
            )}
            {description && <p className="text-body-on-dark text-sm md:text-base">{description}</p>}
          </AnimatedText>
        )}
        {children}
      </Container>
    </section>
  );
}
