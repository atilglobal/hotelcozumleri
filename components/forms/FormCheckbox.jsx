import { cn } from "@/utils/cn";

export default function FormCheckbox({ label, error, id, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          className={cn(
            "mt-1 w-4 h-4 rounded-sm border-navy/20 text-blue",
            "focus:ring-2 focus:ring-blue/30"
          )}
          {...props}
        />
        <span className="text-sm text-gray leading-relaxed">{label}</span>
      </label>
      {error && (
        <p className="text-sm text-red-600 mt-1 ml-7" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
