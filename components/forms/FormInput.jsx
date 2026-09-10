import { cn } from "@/utils/cn";
import FormField from "./FormField";

export default function FormInput({ className, error, label, required, id, ...props }) {
  const input = (
    <input
      id={id}
      className={cn(
        "w-full px-4 py-3 text-navy bg-white border rounded-sm transition-colors",
        "placeholder:text-gray-light/60",
        "focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue",
        error ? "border-red-400" : "border-navy/15",
        className
      )}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <FormField label={label} htmlFor={id} error={error} required={required}>
      {input}
    </FormField>
  );
}
