type Props = {
  label: string;
  color?: "green" | "amber" | "red" | "blue";
};

export default function Badge({ label, color = "blue" }: Props) {
  const colorClass: Record<string, string> = {
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    red: "bg-red-500/10 text-red-300 border-red-500/40",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/40",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border ${colorClass[color]}`}
    >
      {label}
    </span>
  );
}
