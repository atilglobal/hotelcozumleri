import { cn } from "@/utils/cn";

export default function FormSelect({ className, error, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full px-4 py-3 text-navy bg-white border rounded-sm transition-colors appearance-none",
        "focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue",
        error ? "border-red-400" : "border-navy/15",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
