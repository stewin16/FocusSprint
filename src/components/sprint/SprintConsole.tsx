"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Shield,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { SprintConsoleProps } from "./types";
import { formatTime, calculateSprintProgress } from "@/lib/functions";
import { playSprintStartSound, playTactilePop } from "@/components/AudioEffects";

const presets = [
  { label: "10m Demo", mins: 10, title: "Rapid Demo Sprint" },
  { label: "25m Pomodoro", mins: 25, title: "Core Focus Block" },
  { label: "45m Lab Block", mins: 45, title: "Engineering Lab Sprint" },
  { label: "90m Deep Code", mins: 90, title: "Deep Architecture Flow" },
];

export default function SprintConsole({
  session,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
}: SprintConsoleProps) {
  const [selectedPreset, setSelectedPreset] = useState(presets[1]);
  const progressPercent = calculateSprintProgress(
    session.durationMinutes,
    session.timeRemainingSeconds
  );

  const handleStart = () => {
    playSprintStartSound();
    onStart(selectedPreset.mins, selectedPreset.title);
  };

  return (
    <div className="modern-card p-6 md:p-8 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header matching theme with Info dot and Expand arrow */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
              FocusSprint Session Controller
            </h3>
            <button
              title="Session Information"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Status Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {session.status === "running" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 font-bold">Vault Active</span>
                </>
              )}
              {session.status === "paused" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-700 font-bold">Paused</span>
                </>
              )}
              {session.status === "idle" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Ready to Sprint</span>
                </>
              )}
            </div>

            <button
              title="Expand view"
              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Pills (Visible when idle) */}
        {session.status === "idle" && (
          <div className="mb-6">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Select Focus Block Preset:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {presets.map((preset) => {
                const isSelected = selectedPreset.mins === preset.mins;
                return (
                  <button
                    key={preset.mins}
                    onClick={() => {
                      setSelectedPreset(preset);
                      playTactilePop();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 ring-2 ring-blue-500/20 shadow-sm"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{preset.label}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Digital Countdown Timer Display (Sleek Dark Surface) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0f172a] text-white shadow-xl mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-[11px] font-medium tracking-widest text-slate-400 mb-1 uppercase">
            {session.status === "running" ? session.name : "Target Sprint Duration"}
          </div>

          {/* Giant Timer Numbers */}
          <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white tabular-nums drop-shadow-sm my-1">
            {formatTime(session.timeRemainingSeconds)}
          </div>

          {/* Progress Bar matching theme */}
          <div className="mt-6 w-full max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>{progressPercent}% Complete</span>
              <span>{session.batchedCount} Distractions Shielded</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2.5">
          {session.status === "idle" && (
            <button
              onClick={handleStart}
              className="btn-pill bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Engage Focus Sprint</span>
            </button>
          )}

          {session.status === "running" && (
            <>
              <button
                onClick={() => {
                  onPause();
                  playTactilePop();
                }}
                className="btn-pill bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
              <button
                onClick={() => {
                  onStop();
                  playTactilePop();
                }}
                className="btn-pill bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Finish &amp; Release Vault</span>
              </button>
            </>
          )}

          {session.status === "paused" && (
            <>
              <button
                onClick={() => {
                  onResume();
                  playTactilePop();
                }}
                className="btn-pill bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
              <button
                onClick={() => {
                  onStop();
                  playTactilePop();
                }}
                className="btn-pill bg-slate-800 text-white text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>End Sprint</span>
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => {
            onReset();
            playTactilePop();
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Timer</span>
        </button>
      </div>
    </div>
  );
}
