import { cn } from "@/utils/cn";
import FormField from "./FormField";

export default function FormTextarea({ className, error, label, required, id, ...props }) {
  const textarea = (
    <textarea
      id={id}
      className={cn(
        "w-full px-4 py-3 text-navy bg-white border rounded-sm transition-colors resize-y min-h-[120px]",
        "placeholder:text-gray-light/60",
        "focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue",
        error ? "border-red-400" : "border-navy/15",
        className
      )}
      {...props}
    />
  );
  if (!label) return textarea;
  return (
    <FormField label={label} htmlFor={id} error={error} required={required}>
      {textarea}
    </FormField>
  );
}
