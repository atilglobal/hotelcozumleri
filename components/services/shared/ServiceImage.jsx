import Image from "next/image";
import { cn } from "@/utils/cn";

export default function ServiceImage({
  src,
  alt,
  objectPosition = "center",
  className,
  fill = true,
  sizes = "(max-width:768px) 100vw, 50vw",
  priority = false,
}) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      style={{ objectPosition }}
    />
  );
}
