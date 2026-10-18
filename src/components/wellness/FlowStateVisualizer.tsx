"use client";

import React from "react";
import { Sparkles, Brain, BatteryCharging, Zap, Compass, Info, ArrowUpRight } from "lucide-react";
import { WellnessMetricsProps } from "./types";
import { computeCognitiveMetrics } from "@/lib/functions";

export default function FlowStateVisualizer({
  distractionsShieldedToday,
  focusMinutesToday,
}: WellnessMetricsProps) {
  const { cognitiveBattery, fatigueReduction, timeReclaimedHours } = computeCognitiveMetrics(
    distractionsShieldedToday,
    focusMinutesToday
  );

  return (
    <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
              Cognitive Flow &amp; Psychological Health Engine
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Grounded in Csíkszentmihályi&apos;s Flow Theory &amp; UC Irvine Attention Research
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Flow Continuity: Optimal</span>
        </div>
      </div>

      {/* 3 Real-time telemetry cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Cognitive Battery */}
        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-emerald-50/60 to-white border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Cognitive Battery
              </span>
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {cognitiveBattery}%
            </div>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-3">
            Protected against micro-drain switches
          </div>
        </div>

        {/* Time Reclaimed */}
        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-amber-50/60 to-white border-amber-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Time Reclaimed Today
              </span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {timeReclaimedHours} hrs
            </div>
          </div>
          <div className="text-xs text-amber-700 font-medium mt-3">
            Saved from context-switch penalty
          </div>
        </div>

        {/* Fatigue Reduction */}
        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-purple-50/60 to-white border-purple-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Fatigue Reduction
              </span>
              <Compass className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-950 tracking-tight">
              +{fatigueReduction}%
            </div>
          </div>
          <div className="text-xs text-purple-700 font-medium mt-3">
            Less late-night academic burnout
          </div>
        </div>
      </div>

      {/* Visual Quadrant Topology */}
      <div className="rounded-2xl p-6 bg-slate-900 text-white shadow-xl shadow-slate-900/10">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Cognitive State Topology: Engineering Workloads
          </span>
          <span className="text-xs text-slate-400">
            Challenge vs. Cognitive Distraction
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-rose-500/30">
            <div className="text-rose-400 font-bold text-sm mb-1">
              State A: Fragmented Attention (Without FocusSprint)
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              High engineering task complexity combined with constant group chat pings leads to continuous attention residue. Students spend 2+ hours daily simply trying to re-orient themselves after interruptions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-1.5">
              <span>State B: Eudaimonic Flow (With FocusSprint)</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Distractions are held in batch storage while critical emergencies remain armed. Cognitive continuity is preserved, allowing students to experience deep flow, master difficult code, and feel authentic accomplishment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
