import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({ variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:opacity-50 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
      : "border border-slate-600 text-slate-200 hover:bg-slate-800 px-4 py-2";

  return <button className={`${base} ${styles}`} {...props} />;
}
