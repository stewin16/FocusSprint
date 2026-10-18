"use client";

import React, { useState } from "react";
import { Calculator, Clock, BatteryWarning, TrendingUp, AlertCircle, Info, ArrowUpRight } from "lucide-react";
import { playTactilePop } from "@/components/AudioEffects";

export default function CognitiveFatigueCalculator() {
  const [interruptionsPerHour, setInterruptionsPerHour] = useState(8);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(4);

  // According to Gloria Mark (UC Irvine Attention Research), resuming deep flow takes ~23 minutes.
  // In conservative engineering modeling, each micro-switch drains 6-8 minutes of pure focus.
  const dailySwitches = interruptionsPerHour * studyHoursPerDay;
  const minutesLostPerDay = Math.min(studyHoursPerDay * 60, Math.round(dailySwitches * 7.5));
  const hoursLostPerDay = Number((minutesLostPerDay / 60).toFixed(1));
  const hoursLostPerMonth = Number((hoursLostPerDay * 24).toFixed(0));
  const cognitiveEfficiency = Math.max(25, 100 - Math.round((hoursLostPerDay / studyHoursPerDay) * 100));

  return (
    <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
              Interactive Attention Residue &amp; Fatigue Calculator
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Estimate how much engineering deep-work time you lose to notification context switching
            </p>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Notification pings per study hour:
            </label>
            <span className="font-extrabold text-sm text-slate-900 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {interruptionsPerHour} / hr
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={25}
            value={interruptionsPerHour}
            onChange={(e) => {
              setInterruptionsPerHour(Number(e.target.value));
              playTactilePop();
            }}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
            <span>Minimal (1)</span>
            <span>Average Peer (8)</span>
            <span>Heavy Groups (25)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Daily deep-work / coding hours:
            </label>
            <span className="font-extrabold text-sm text-slate-900 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
              {studyHoursPerDay} hrs / day
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={studyHoursPerDay}
            onChange={(e) => {
              setStudyHoursPerDay(Number(e.target.value));
              playTactilePop();
            }}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
            <span>Light (1h)</span>
            <span>Standard Lab (4h)</span>
            <span>Exam Grind (8h)</span>
          </div>
        </div>
      </div>

      {/* Results Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-rose-50/60 to-white border-rose-100 text-center">
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
            Daily Attention Residue
          </span>
          <div className="text-3xl font-extrabold text-rose-950 tracking-tight">
            {hoursLostPerDay} hrs
          </div>
          <span className="text-[11px] text-rose-700/80 font-medium mt-1 block">
            Lost to re-orienting attention
          </span>
        </div>

        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-amber-50/60 to-white border-amber-100 text-center">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Monthly Focus Deficit
          </span>
          <div className="text-3xl font-extrabold text-amber-950 tracking-tight">
            {hoursLostPerMonth} hrs
          </div>
          <span className="text-[11px] text-amber-700/80 font-medium mt-1 block">
            ~4 full college study days wasted
          </span>
        </div>

        <div className="modern-card-sm p-4 sm:p-5 bg-gradient-to-br from-emerald-50/60 to-white border-emerald-100 text-center">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            FocusSprint Reclaimed Efficiency
          </span>
          <div className="text-3xl font-extrabold text-emerald-950 tracking-tight">
            {cognitiveEfficiency}%
          </div>
          <span className="text-[11px] text-emerald-700/80 font-medium mt-1 block">
            Restored through batching
          </span>
        </div>
      </div>
    </div>
  );
}
