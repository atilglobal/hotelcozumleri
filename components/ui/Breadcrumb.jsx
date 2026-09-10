import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray-light/50" aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span className="text-navy font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-light hover:text-blue transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
