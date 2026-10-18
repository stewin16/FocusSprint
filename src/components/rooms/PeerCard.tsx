"use client";

import React, { useState } from "react";
import { Hand, Flame, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { PeerCardProps } from "./types";
import { playTactilePop } from "@/components/AudioEffects";

export default function PeerCard({ student, onHighFive }: PeerCardProps) {
  const [justHighFived, setJustHighFived] = useState(false);

  const handleHighFive = () => {
    setJustHighFived(true);
    playTactilePop();
    onHighFive(student.id);
    setTimeout(() => setJustHighFived(false), 900);
  };

  const isInFlow = student.status === "in_flow";

  return (
    <div className="modern-card p-5 bg-white flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Top Row: Avatar & Status */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  isInFlow ? "bg-emerald-500 ring-2 ring-emerald-400/20" : "bg-amber-400"
                }`}
                title={isInFlow ? "In Deep Flow State" : "On Short Break"}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 tracking-tight">
                  {student.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {student.rollNo}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium block">
                {student.subject}
              </span>
            </div>
          </div>

          {/* Streak pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-700 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{student.streakDays}d</span>
          </div>
        </div>

        {/* Current Task Description */}
        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 mb-3 text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2">
          <Code2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{student.currentTask}</span>
        </div>
      </div>

      {/* Bottom Row: Stats & High Five CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
            Focus Today
          </span>
          <span className="font-bold text-xs sm:text-sm text-slate-900">
            {student.focusMinutesToday} mins
          </span>
        </div>

        {/* Non-toxic High-five button */}
        <button
          onClick={handleHighFive}
          className={`btn-pill text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            justHighFived
              ? "bg-amber-400 text-slate-950 scale-105 shadow-md shadow-amber-400/30"
              : "bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900"
          }`}
          title="Send non-toxic solidarity high-five"
        >
          <Hand className={`w-3.5 h-3.5 ${justHighFived ? "rotate-12 transition-transform" : ""}`} />
          <span className="font-bold">{student.highFives}</span>
        </button>
      </div>
    </div>
  );
}
