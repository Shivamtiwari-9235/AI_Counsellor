import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Card({ title, children }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
      {title && <h3 className="text-sm font-medium text-slate-100 mb-2">{title}</h3>}
      {children}
    </div>
  );
}
