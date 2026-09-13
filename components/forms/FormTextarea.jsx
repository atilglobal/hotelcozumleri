import { cn } from "@/utils/cn";
import FormField from "./FormField";

export default function FormTextarea({ className, error, label, required, id, ...props }) {
  const textarea = (
    <textarea
      id={id}
      className={cn(
        "input-dark resize-y min-h-[120px]",
        error && "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
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
