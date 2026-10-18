"use client";

import React from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { SubjectMetric } from "@/types";
import { mockSubjectMetrics } from "@/lib/mockData";

interface PerformanceCardProps {
  items?: SubjectMetric[];
}

export default function PerformanceCard({ items = mockSubjectMetrics }: PerformanceCardProps) {
  return (
    <div className="modern-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Subject Focus Performance
            </h3>
            <button title="Performance details" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rows with horizontal amber bars */}
        <div className="space-y-3 py-3">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 truncate max-w-[140px] sm:max-w-none">
                  {item.name}
                </span>
                <span className="font-bold text-slate-800 text-[11px]">
                  {item.score}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${item.barPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote text */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
        Compiler Design shows the strongest deep focus, while academic WhatsApp chats need the most batching.
      </div>
    </div>
  );
}
