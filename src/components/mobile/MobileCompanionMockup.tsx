"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Award,
  Shield,
  Zap,
  Flame,
  CheckCircle2,
  Bell,
  Sparkles,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { playTactilePop, playSprintStartSound } from "@/components/AudioEffects";
import { MobileAchievement } from "@/types";
import { mockMobileAchievements } from "@/lib/mockData";

interface MobileCompanionProps {
  studentName?: string;
  role?: string;
  isDeepWorkActive?: boolean;
  onToggleDeepWork?: () => void;
  batchedCount?: number;
  achievements?: MobileAchievement[];
}

export default function MobileCompanionMockup({
  studentName = "Rahul Mehta",
  role = "CS Engineering • 3rd Year",
  isDeepWorkActive = true,
  onToggleDeepWork,
  batchedCount = 4,
  achievements = mockMobileAchievements,
}: MobileCompanionProps) {

  return (
    <div className="iphone-frame w-[340px] sm:w-[360px] h-[720px] shadow-2xl flex flex-col justify-between shrink-0 select-none mx-auto">
      {/* Top Status Bar & Dynamic Island */}
      <div className="pt-3 px-6 pb-2 flex items-center justify-between text-xs font-semibold text-slate-900 bg-white z-10">
        <span>9:41</span>
        <div className="w-24 h-5 rounded-full bg-slate-950 flex items-center justify-end px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>5G</span>
          <div className="w-5 h-2.5 rounded-sm border border-slate-900 p-0.5 flex items-center">
            <div className="h-full bg-slate-900 w-3 rounded-xs" />
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {/* Top App Bar */}
        <div className="px-5 py-3 flex items-center justify-between bg-white border-b border-slate-100">
          <button className="text-slate-600 hover:text-slate-900 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-xs text-slate-800 tracking-tight">
            FocusSprint Mobile
          </span>
          <button className="text-slate-600 hover:text-slate-900 cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Blue Curved Profile Header Card */}
        <div className="p-4">
          <div className="rounded-3xl p-5 bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 text-center relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <h3 className="text-lg font-bold text-white tracking-tight">
              {studentName}
            </h3>
            <p className="text-[11px] text-white/80 font-medium">
              {role}
            </p>

            {/* Avatar with Halo */}
            <div className="my-4 flex items-center justify-center">
              <div className="relative p-1 rounded-full border-2 border-white/60 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
            </div>

            {/* 3 Metrics Row */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-center text-xs">
              <div>
                <div className="text-[10px] text-white/75 font-medium">Technical Focus</div>
                <div className="font-extrabold text-sm text-white mt-0.5">88%</div>
              </div>
              <div>
                <div className="text-[10px] text-white/75 font-medium">Flow State</div>
                <div className="font-extrabold text-sm text-white mt-0.5">94%</div>
              </div>
              <div>
                <div className="text-[10px] text-white/75 font-medium">Study Streak</div>
                <div className="font-extrabold text-sm text-white mt-0.5">8 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Work Mode Toggle */}
        <div className="px-4 mb-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Zap className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800">Deep Work Mode</div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {isDeepWorkActive ? `${batchedCount} distractions held in vault` : "Tap to activate focus block"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onToggleDeepWork) onToggleDeepWork();
                playTactilePop();
              }}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                isDeepWorkActive ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isDeepWorkActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="px-4 pb-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-800">Focus Achievements</span>
                <Info className="w-3 h-3 text-slate-400" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>

            <div className="space-y-3.5">
              {achievements.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="font-medium text-slate-700 text-xs">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-bold text-[11px] text-slate-800">
                      {item.score}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.barColor} transition-all`}
                      style={{ width: `${item.barPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-2 pt-1 bg-white flex justify-center z-10">
        <div className="w-32 h-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}
