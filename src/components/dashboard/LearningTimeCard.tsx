"use client";

import React from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { DeepWorkTimeMetric } from "@/types";
import { mockDeepWorkTime } from "@/lib/mockData";

interface LearningTimeCardProps {
  metric?: DeepWorkTimeMetric;
}

export default function LearningTimeCard({ metric = mockDeepWorkTime }: LearningTimeCardProps) {
  return (
    <div className="modern-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header matching theme */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Focus &amp; Deep-Work Time
            </h3>
            <button title="Time info" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Minimalist vertical amber bar chart */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="flex items-end justify-center gap-2 h-20 w-full px-4">
            {metric.bars.map((b, idx) => (
              <div
                key={idx}
                className="w-3 rounded-full bg-amber-400/80 hover:bg-amber-400 transition-all duration-300"
                style={{ height: `${b.height}%` }}
              />
            ))}
          </div>

          {/* Time tags (e.g. 22h, 38h in dark pills matching theme) */}
          <div className="flex items-center gap-3 mt-4">
            {metric.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900 text-white shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footnote text */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
        {metric.improvementText}
      </div>
    </div>
  );
}
