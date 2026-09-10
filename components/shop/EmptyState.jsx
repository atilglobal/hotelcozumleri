import Button from "@/components/ui/Button";

export default function EmptyState({ title, description, actionHref, actionLabel = "Alışverişe Başla" }) {
  return (
    <div className="text-center py-16 px-6 bg-white border border-navy/8 rounded-sm">
      <h2 className="font-display text-2xl text-navy mb-3">{title}</h2>
      <p className="text-gray-light mb-8 max-w-md mx-auto">{description}</p>
      {actionHref && (
        <Button href={actionHref} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
