"use client";

import React from "react";
import { X, User, Flame, Award, BookOpen, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { playTactilePop } from "@/components/AudioEffects";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
}

export default function StudentProfileModal({
  isOpen,
  onClose,
  studentName = "Rahul",
}: StudentProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 relative">
        <button
          onClick={() => {
            onClose();
            playTactilePop();
          }}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Avatar & Header */}
        <div className="text-center pb-4 mb-4 border-b border-slate-100">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center text-xl font-extrabold text-white">
                RM
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/20" />
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
            {studentName} (Lead Architect)
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            B.Tech Computer Science &bull; Semester 6
          </p>
          <span className="inline-block mt-2 text-[10px] font-bold px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            Team 3: Digital Life &bull; Presenter
          </span>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div className="font-extrabold text-base text-slate-900">7 Days</div>
            <div className="text-[10px] text-slate-400 font-medium">Sprint Streak</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-base text-slate-900">38.4h</div>
            <div className="text-[10px] text-slate-400 font-medium">Reclaimed Focus</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-indigo-600 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-base text-slate-900">94/100</div>
            <div className="text-[10px] text-slate-400 font-medium">Flow Score</div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-2 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Semester Courses
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-800">CS-302 Compiler Design Lab</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                85% Complete
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-800">CS-308 Database Internals</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                60% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            playTactilePop();
          }}
          className="w-full btn-pill bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 shadow-sm cursor-pointer"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
}
