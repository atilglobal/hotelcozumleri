import { cn } from "@/utils/cn";

const variants = {
  a: "section-dark-a",
  b: "section-dark-b",
  c: "section-dark-c",
  d: "section-dark-d",
  gradient: "section-dark-gradient",
};

export default function SectionBackdrop({ variant = "b", watermark, className }) {
  return (
    <div className={cn("section-backdrop", variants[variant], className)} aria-hidden="true">
      {watermark && (
        <span className="section-watermark">{watermark}</span>
      )}
    </div>
  );
}
