import { cn } from "@/utils/cn";

export default function FormField({ label, htmlFor, error, children, required, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium heading-on-dark">
          {label}
          {required && <span className="text-gold-light ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
