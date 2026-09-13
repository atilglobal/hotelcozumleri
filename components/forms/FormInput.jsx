import { cn } from "@/utils/cn";
import FormField from "./FormField";

export default function FormInput({ className, error, label, required, id, ...props }) {
  const input = (
    <input
      id={id}
      className={cn(
        "input-dark",
        error && "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
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
