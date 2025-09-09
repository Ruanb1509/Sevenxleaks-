// DateRangeFilter.tsx
import React from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export type DateFilterValue = "all" | "today" | "yesterday" | "7days";

type Props = {
  value: DateFilterValue;
  onChange: (v: DateFilterValue) => void;
  themeColor?: "purple" | "orange" | "yellow" | "red" | "slate";
  className?: string;
};

export const DateRangeFilter: React.FC<Props> = ({ 
  value, 
  onChange, 
  themeColor = "purple", 
  className 
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getThemeClasses = () => {
    const themes = {
      purple: {
        icon: isDark ? "text-purple-400" : "text-purple-600",
        active: isDark 
          ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/30"
          : "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20",
        inactive: isDark
          ? "bg-gray-700/50 text-gray-300 hover:bg-purple-500/20 border-gray-600/50 hover:text-purple-300 hover:border-purple-500/30"
          : "bg-gray-200/50 text-gray-700 hover:bg-purple-100 border-gray-300/50 hover:text-purple-700 hover:border-purple-400/40"
      },
      orange: {
        icon: isDark ? "text-orange-400" : "text-orange-600",
        active: isDark 
          ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/30"
          : "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/20",
        inactive: isDark
          ? "bg-gray-700/50 text-gray-300 hover:bg-orange-500/20 border-gray-600/50 hover:text-orange-300 hover:border-orange-500/30"
          : "bg-gray-200/50 text-gray-700 hover:bg-orange-100 border-gray-300/50 hover:text-orange-700 hover:border-orange-400/40"
      },
      yellow: {
        icon: isDark ? "text-yellow-400" : "text-yellow-600",
        active: isDark 
          ? "bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30"
          : "bg-yellow-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/20",
        inactive: isDark
          ? "bg-gray-700/50 text-gray-300 hover:bg-yellow-500/20 border-gray-600/50 hover:text-yellow-300 hover:border-yellow-500/30"
          : "bg-gray-200/50 text-gray-700 hover:bg-yellow-100 border-gray-300/50 hover:text-yellow-700 hover:border-yellow-400/40"
      },
      red: {
        icon: isDark ? "text-red-400" : "text-red-600",
        active: isDark 
          ? "bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/30"
          : "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/20",
        inactive: isDark
          ? "bg-gray-700/50 text-gray-300 hover:bg-red-500/20 border-gray-600/50 hover:text-red-300 hover:border-red-500/30"
          : "bg-gray-200/50 text-gray-700 hover:bg-red-100 border-gray-300/50 hover:text-red-700 hover:border-red-400/40"
      },
      slate: {
        icon: isDark ? "text-slate-400" : "text-slate-600",
        active: isDark 
          ? "bg-slate-500 text-white border-slate-400 shadow-lg shadow-slate-500/30"
          : "bg-slate-600 text-white border-slate-500 shadow-lg shadow-slate-500/20",
        inactive: isDark
          ? "bg-gray-700/50 text-gray-300 hover:bg-slate-500/20 border-gray-600/50 hover:text-slate-300 hover:border-slate-500/30"
          : "bg-gray-200/50 text-gray-700 hover:bg-slate-100 border-gray-300/50 hover:text-slate-700 hover:border-slate-400/40"
      }
    };
    return themes[themeColor];
  };

  const themeClasses = getThemeClasses();

  const baseBtn = "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border whitespace-nowrap";

  const label = (k: DateFilterValue) =>
    k === "all" ? "All" : k === "7days" ? "7 Days" : k.charAt(0).toUpperCase() + k.slice(1);

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <Calendar className={`w-4 h-4 ${themeClasses.icon}`} />
      {(["all", "today", "yesterday", "7days"] as DateFilterValue[]).map((k) => (
        <motion.button
          key={k}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${baseBtn} ${value === k ? themeClasses.active : themeClasses.inactive}`}
          onClick={() => onChange(k)}
        >
          {label(k)}
        </motion.button>
      ))}
    </div>
  );
};

// -------- Função utilitária para criar filtros de data --------
export function createDateFilter(dateFilter: DateFilterValue, month?: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let whereClause: any = {};

  // Se um mês específico foi selecionado, use apenas esse filtro
  if (month) {
    whereClause.postDate = {
      // Usar função SQL para extrair mês do postDate
      month: parseInt(month),
      year: today.getFullYear()
    };
    return whereClause;
  }

  // Filtros de data específicos baseados no backend
  switch (dateFilter) {
    case 'today':
      whereClause.dateFilter = 'today';
      break;
      
    case 'yesterday':
      whereClause.dateFilter = 'yesterday';
      break;
      
    case '7days':
      whereClause.dateFilter = '7days';
      break;
      
    case 'all':
    default:
      // Sem filtro de data
      break;
  }

  return whereClause;
}

// -------- Função para aplicar filtros de data no frontend (com lógica -1 dia) --------
export type WithDates = { postDate?: string; createdAt?: string };

function startOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function endOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

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

/** 
 * Aplica filtro de data considerando que postDate representa o dia anterior.
 * LÓGICA: Se postDate é "2025-01-08", o conteúdo real é do dia "2025-01-09"
 */
export function applyDateFilter<T extends WithDates>(
  items: T[],
  filter: "all" | "today" | "yesterday" | "7days"
): T[] {
  if (filter === "all") return items;

  const now = new Date();
  const today = startOfDayLocal(now);
  const todayEnd = endOfDayLocal(now);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayEnd = endOfDayLocal(yesterday);
  
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return items.filter((item) => {
    const postDateStr = item.postDate || item.createdAt;
    if (!postDateStr) return false;

    const postDate = parseDateLocal(postDateStr);
    if (!postDate) return false;

    // APLICAR LÓGICA: postDate + 1 dia = data real do conteúdo
    const realContentDate = new Date(postDate);
    realContentDate.setDate(realContentDate.getDate() + 1);
    
    const contentTime = realContentDate.getTime();

    switch (filter) {
      case "today":
        return contentTime >= today.getTime() && contentTime <= todayEnd.getTime();
      
      case "yesterday":
        return contentTime >= yesterday.getTime() && contentTime <= yesterdayEnd.getTime();
      
      case "7days":
        return contentTime >= sevenDaysAgo.getTime() && contentTime <= todayEnd.getTime();
      
      default:
        return false;
    }
  });
}