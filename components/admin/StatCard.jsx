export default function StatCard({ label, value, sub, accent = "blue" }) {
  const colors = { blue: "border-l-blue", gold: "border-l-gold", green: "border-l-green-600", red: "border-l-red-500" };
  return (
    <div className={`bg-white rounded-lg border border-gray-200 border-l-4 ${colors[accent] || colors.blue} p-5`}>
      <p className="text-xs uppercase tracking-wide text-gray-light mb-1">{label}</p>
      <p className="text-2xl font-display text-navy">{value}</p>
      {sub && <p className="text-xs text-gray-light mt-1">{sub}</p>}
    </div>
  );
}
