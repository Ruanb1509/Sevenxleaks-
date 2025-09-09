// DateRangeFilter.tsx
import React from "react";

export type DateFilterValue = "all" | "today" | "yesterday" | "7days";

type Props = {
  value: DateFilterValue;
  onChange: (v: DateFilterValue) => void;
  isDark?: boolean;
  className?: string;
};

export const DateRangeFilter: React.FC<Props> = ({ value, onChange, isDark, className }) => {
  const baseBtn =
    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border whitespace-nowrap";

  const active = isDark
    ? "bg-purple-500 text-white border-purple-400"
    : "bg-purple-600 text-white border-purple-500";

  const inactive = isDark
    ? "bg-gray-700/50 text-gray-300 hover:bg-purple-500/20 border-gray-600/50"
    : "bg-gray-200/50 text-gray-700 hover:bg-purple-100 border-gray-300/50";

  const label = (k: DateFilterValue) =>
    k === "all" ? "All" : k === "7days" ? "7 Days" : k.charAt(0).toUpperCase() + k.slice(1);

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {(["all", "today", "yesterday", "7days"] as DateFilterValue[]).map((k) => (
        <button
          key={k}
          className={`${baseBtn} ${value === k ? active : inactive}`}
          onClick={() => onChange(k)}
        >
          {label(k)}
        </button>
      ))}
    </div>
  );
};

// -------- Utilitário de filtragem --------
export type WithDates = { postDate?: string; createdAt?: string };

function startOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

// parse local robusto (evita UTC em YYYY-MM-DD)
function parseDateLocal(s?: string): Date | null {
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
    const t = Date.parse(s);
    return Number.isNaN(t) ? null : new Date(t);
  }
  const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymd) return new Date(+ymd[1], +ymd[2] - 1, +ymd[3], 12, 0, 0, 0);
  const t = Date.parse(s);
  return Number.isNaN(t) ? null : new Date(t);
}

/** postDate ajustado em -1 dia. Fallback em createdAt. */
export function applyDateFilter<T extends WithDates>(
  items: T[],
  filter: "all" | "today" | "yesterday" | "7days"
): T[] {
  if (filter === "all") return items;

  const now = new Date();
  const today0 = startOfDayLocal(now);
  const yesterday0 = new Date(today0); yesterday0.setDate(yesterday0.getDate() - 1);
  const sevenDays0 = new Date(today0); sevenDays0.setDate(sevenDays0.getDate() - 7);

  return items.filter((it) => {
    const base = parseDateLocal(it.postDate) ?? parseDateLocal(it.createdAt);
    if (!base) return false;

    // AJUSTE SOLICITADO: -1 dia em TODAS as verificações
    const adj = new Date(base);
    adj.setDate(adj.getDate());
    const t = adj.getTime();

    if (filter === "today")      return t >= today0.getTime();
    if (filter === "yesterday")  return t >= yesterday0.getTime() && t < today0.getTime();
    /* 7days inclui hoje */
    return t >= sevenDays0.getTime();
  });
}