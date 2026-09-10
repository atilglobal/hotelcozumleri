import Button from "@/components/ui/Button";

export default function FormSuccess({ title, description }) {
  return (
    <div className="text-center py-12 px-6 bg-white border border-navy/10 rounded-sm">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ice flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E5BA8" strokeWidth="2">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-display text-3xl text-navy mb-4">{title}</h2>
      <p className="text-gray-light leading-relaxed max-w-md mx-auto mb-8">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/" variant="primary" size="lg">
          Ana Sayfaya Dön
        </Button>
        <Button href="/cozumler" variant="outline" size="lg">
          Çözümleri İncele
        </Button>
      </div>
    </div>
  );
}
