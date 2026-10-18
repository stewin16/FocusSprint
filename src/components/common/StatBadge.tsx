import React from "react";

interface StatBadgeProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ElementType;
  colorScheme?: "cyan" | "emerald" | "amber" | "rose" | "purple" | "slate";
}

export default function StatBadge({
  label,
  value,
  subtext,
  icon: Icon,
  colorScheme = "slate",
}: StatBadgeProps) {
  const schemeStyles = {
    cyan: "bg-cyan-50 border-cyan-950 text-cyan-950",
    emerald: "bg-emerald-50 border-emerald-950 text-emerald-950",
    amber: "bg-amber-50 border-amber-950 text-amber-950",
    rose: "bg-rose-50 border-rose-950 text-rose-950",
    purple: "bg-purple-50 border-purple-950 text-purple-950",
    slate: "bg-white border-slate-950 text-slate-950",
  };

  const badgeStyles = {
    cyan: "bg-cyan-400 text-slate-950",
    emerald: "bg-emerald-400 text-slate-950",
    amber: "bg-amber-400 text-slate-950",
    rose: "bg-rose-500 text-white",
    purple: "bg-purple-400 text-slate-950",
    slate: "bg-slate-950 text-white",
  };

  return (
    <div
      className={`p-4 rounded-xl border-2 shadow-[3px_3px_0px_#0f172a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 ${schemeStyles[colorScheme]}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
          {label}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded-md border border-slate-950 ${badgeStyles[colorScheme]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <div className="text-2xl font-black font-mono tracking-tight text-slate-950">
        {value}
      </div>
      {subtext && (
        <div className="text-xs font-mono text-slate-600 mt-1 font-medium">
          {subtext}
        </div>
      )}
    </div>
  );
}
