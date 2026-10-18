"use client";

import React, { useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { SprintCompletionMetric } from "@/types";
import { mockSprintCompletion } from "@/lib/mockData";

interface CompletionRateCardProps {
  metric?: SprintCompletionMetric;
}

export default function CompletionRateCard({ metric = mockSprintCompletion }: CompletionRateCardProps) {
  const [percent, setPercent] = useState(metric.percent);

  return (
    <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white relative overflow-hidden flex flex-col justify-between shadow-lg shadow-blue-500/20">
      <div>
        {/* Header matching theme */}
        <div className="flex items-center justify-between pb-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
              Focus Sprint Completion
            </h3>
            <button title="Completion info" className="text-white/70 hover:text-white transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button title="Expand view" className="text-white/70 hover:text-white transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Big Percentages Row */}
        <div className="flex items-baseline justify-between pt-5 pb-3">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {percent}%
            </div>
            <div className="text-xs text-white/80 font-medium mt-0.5">
              Complete
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-white/90">
              {100 - percent}%
            </div>
            <div className="text-xs text-white/70 font-medium mt-0.5">
              In progress
            </div>
          </div>
        </div>

        {/* Interactive Slider Bar with Knob */}
        <div className="py-3">
          <div
            className="relative w-full h-1.5 bg-white/30 rounded-full flex items-center cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = Math.round(Math.min(100, Math.max(0, (clickX / rect.width) * 100)));
              setPercent(newPct);
            }}
          >
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-blue-600 cursor-pointer -translate-x-1/2"
              style={{ left: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footnote text */}
      <div className="pt-3 border-t border-white/20 text-[11px] text-white/75 text-center leading-relaxed">
        {metric.footnote}
      </div>
    </div>
  );
}
