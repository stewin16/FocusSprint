"use client";

import React from "react";
import { Scale, CheckCircle2, XCircle, Heart, Award, Sparkles } from "lucide-react";

export default function EudaimonicComparison() {
  const points = [
    {
      dimension: "Psychological Core",
      hedonic: "Temporary dopamine relief from putting the phone away or forcing blunt willpower.",
      eudaimonic: "Protects finite cognitive reserves, enabling true creative mastery and flow states.",
    },
    {
      dimension: "Approach to FOMO",
      hedonic: "Ignores student anxiety. Locks all apps completely, causing students to uninstall it.",
      eudaimonic: "Eliminates anxiety through selective emergency bypass filters for critical college alerts.",
    },
    {
      dimension: "Academic Impact",
      hedonic: "Passive compliance (counting screen minutes without depth of learning).",
      eudaimonic: "Uninterrupted deep work blocks for solving complex algorithmic and lab problems.",
    },
    {
      dimension: "Long-term Outcome",
      hedonic: "Willpower exhaustion, rebound doom-scrolling, and lingering guilt.",
      eudaimonic: "Self-actualization, authentic engineering craft, and genuine offline mental calm.",
    },
  ];

  return (
    <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Psychological Framework
            </span>
            <span className="text-xs text-slate-400 font-medium">Slide 5 &bull; Evaluator Alignment</span>
          </div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
            Hedonic Distraction Relief vs. Eudaimonic Well-Being
          </h3>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Hedonic Column */}
        <div className="modern-card-sm p-5 sm:p-6 bg-slate-50/60 border-slate-200/80">
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-200">
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
              <XCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              Standard Focus Apps (Hedonic Relief)
            </h4>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
            Relies on rigid bans, guilt-tripping, and arbitrary time locks. Fails because engineering students legitimately need academic group communication.
          </p>

          <div className="space-y-3">
            {points.map((p, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-slate-700 block mb-1">{p.dimension}:</span>
                <span className="text-slate-600 leading-relaxed block bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  {p.hedonic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Eudaimonic Column */}
        <div className="modern-card-sm p-5 sm:p-6 bg-gradient-to-br from-emerald-50/50 to-white border-emerald-200/90 shadow-sm shadow-emerald-500/5">
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-emerald-100">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-emerald-950">
              FocusSprint (Eudaimonic Flourishing)
            </h4>
          </div>
          <p className="text-xs text-emerald-800 font-medium mb-4 leading-relaxed">
            Understands the reality of college life. Batches low-priority noise while preserving psychological safety through emergency overrides.
          </p>

          <div className="space-y-3">
            {points.map((p, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-emerald-950 block mb-1">{p.dimension}:</span>
                <span className="text-slate-800 leading-relaxed block bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                  {p.eudaimonic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
