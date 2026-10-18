"use client";

import React from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { BatchingStreamMetrics, CampusNotification } from "@/types";
import { mockBatchingStreamMetrics, mockSampleInjections } from "@/lib/mockData";
import { playBatchInterceptionSound, playEmergencyAlertSound } from "@/components/AudioEffects";

interface SpendingBatchingCardProps {
  onInject?: (notif: CampusNotification) => void;
  batchedCount?: number;
  metrics?: BatchingStreamMetrics;
}

export default function SpendingBatchingCard({
  onInject,
  batchedCount,
  metrics = mockBatchingStreamMetrics,
}: SpendingBatchingCardProps) {
  const currentBatchedCount = batchedCount ?? metrics.totalBatched;

  const triggerSample = (type: "emergency" | "academic" | "social") => {
    if (!onInject) return;

    let sample = mockSampleInjections[0];
    if (type === "academic") sample = mockSampleInjections[1];
    if (type === "social") sample = mockSampleInjections[2];

    if (sample.urgency === "emergency") {
      playEmergencyAlertSound();
    } else {
      playBatchInterceptionSound();
    }

    onInject({
      ...sample,
      id: `sim-${Date.now()}`,
      timestamp: "Just now",
    });
  };

  return (
    <div className="modern-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header matching theme */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Batching Stream Overview
            </h3>
            <button title="Batching details" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-50">
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Total Batched</div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
              {currentBatchedCount} Alerts
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Daily Average</div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
              {metrics.dailyAverage} Shielded
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Focus Saved</div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
              {metrics.focusSavedHours}h / day
            </div>
          </div>
        </div>

        {/* Flow Representation matching theme */}
        <div className="py-4 relative flex items-center justify-between">
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-7 text-slate-900 font-bold">{metrics.academicPercent}%</span>
              <span className="text-[11px] text-slate-500 font-normal">Academic WhatsApp</span>
            </div>
            <div className="text-[11px] text-slate-400 font-normal pl-9">
              Discord Assignment Pings
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 text-slate-900 font-bold">{metrics.socialPercent}%</span>
              <span className="text-[11px] text-slate-500 font-normal">Social &amp; Reels</span>
            </div>
            <div className="text-[11px] text-slate-400 font-normal pl-9">
              Marketing &amp; App Buzzes
            </div>
          </div>

          <div className="flex-1 px-3">
            <svg className="w-full h-24" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path
                d="M 10 25 C 80 25, 120 20, 190 20"
                fill="none"
                stroke="#fed7aa"
                strokeWidth="16"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 25 C 80 25, 120 50, 190 50"
                fill="none"
                stroke="#c7d2fe"
                strokeWidth="12"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 75 C 80 75, 120 50, 190 50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeOpacity="0.7"
                strokeLinecap="round"
              />
              <path
                d="M 10 75 C 80 75, 120 80, 190 80"
                fill="none"
                stroke="#bbf7d0"
                strokeWidth="16"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="space-y-3 text-right text-[11px] font-bold text-slate-800">
            <div className="flex items-center justify-end gap-1.5">
              <span>Vault Held</span>
              <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">🔒</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span>VIP Pass</span>
              <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">🚨</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span>Silenced</span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">🔇</span>
            </div>
          </div>
        </div>

        {/* Live Notification Injection Sandbox triggers */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => triggerSample("academic")}
            className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
          >
            + WhatsApp Chat
          </button>
          <button
            onClick={() => triggerSample("emergency")}
            className="text-[10px] px-2.5 py-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold transition-colors cursor-pointer"
          >
            + Lab Exam Emergency
          </button>
          <button
            onClick={() => triggerSample("social")}
            className="text-[10px] px-2.5 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium transition-colors cursor-pointer"
          >
            + Instagram Reel
          </button>
        </div>
      </div>

      {/* Footnote */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        {metrics.footnote}
      </div>
    </div>
  );
}
