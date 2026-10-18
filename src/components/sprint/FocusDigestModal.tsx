"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  CheckCircle,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  MessageCircle,
  Camera,
  Coffee,
  Sparkles,
} from "lucide-react";
import { FocusDigestModalProps } from "./types";
import { calculateFlowScore, computeCognitiveMetrics } from "@/lib/functions";
import { playSprintCompleteSound, playTactilePop } from "@/components/AudioEffects";

export default function FocusDigestModal({
  isOpen,
  session,
  batchedNotifications,
  onClose,
}: FocusDigestModalProps) {
  useEffect(() => {
    if (isOpen) {
      playSprintCompleteSound();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#0f172a"],
        });
      } catch {
        // Fallback if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const flowScore = calculateFlowScore(session.durationMinutes, batchedNotifications.length);
  const { timeReclaimedHours } = computeCognitiveMetrics(batchedNotifications.length, session.durationMinutes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/90">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            playTactilePop();
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3 text-white">
            <Trophy className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            Sprint Completed &bull; Vault Unlocked
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            FocusSprint Digest &amp; Flow Report
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            You successfully protected your cognitive reserves and completed deep engineering work.
          </p>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-white border border-amber-100 text-center">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
              Deep Work Time
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {session.durationMinutes} Mins
            </div>
            <span className="text-[11px] text-amber-700 font-medium mt-0.5 block">Zero context breaks</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/70 to-white border border-purple-100 text-center">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
              Shielded Pings
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 tracking-tight">
              {batchedNotifications.length} Alerts
            </div>
            <span className="text-[11px] text-purple-700 font-medium mt-0.5 block">~{timeReclaimedHours}h focus saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-100 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Flow State Score
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              {flowScore}/100
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-0.5 block">Eudaimonic mastery</span>
          </div>
        </div>

        {/* Batched Notifications Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Batched Notifications Summary ({batchedNotifications.length}):
            </span>
            <span className="text-xs text-slate-400">
              Held safely without ambient FOMO
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {batchedNotifications.length === 0 ? (
              <div className="p-4 rounded-2xl border border-slate-100 text-center text-xs text-slate-400 font-medium">
                No distractions arrived during this block. Pure uninterrupted flow!
              </div>
            ) : (
              batchedNotifications.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-slate-800 shrink-0">{item.sender}:</span>
                    <span className="text-slate-600 truncate">{item.message}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 shrink-0">
                    {item.channel}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Eudaimonic Takeaway Note */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 mb-6 text-xs text-emerald-900 leading-relaxed">
          <strong className="text-emerald-950 block mb-1 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Eudaimonic Wellness Benefit:</span>
          </strong>
          By batching non-urgent chats and retaining cognitive continuity, you prevented fragmented attention and late-night burnout. Your brain remained in a state of high-order creative problem solving.
        </div>

        {/* Footer CTA */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              playTactilePop();
            }}
            className="btn-pill bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 shadow-sm shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Acknowledge &amp; Finish Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
