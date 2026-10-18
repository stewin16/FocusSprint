"use client";

import React, { useState } from "react";
import { X, Settings, Volume2, VolumeX, Shield, Database, RefreshCw, CheckCircle2 } from "lucide-react";
import { getAudioMuted, setAudioMuted, playTactilePop } from "@/components/AudioEffects";

interface SystemSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetVault?: () => void;
}

export default function SystemSettingsModal({
  isOpen,
  onClose,
  onResetVault,
}: SystemSettingsModalProps) {
  const [muted, setMuted] = useState(getAudioMuted());
  const [autoDnd, setAutoDnd] = useState(true);
  const [sensitivity, setSensitivity] = useState<"lenient" | "normal" | "strict">("normal");
  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setAudioMuted(nextMuted);
    if (!nextMuted) playTactilePop();
  };

  const handleSave = () => {
    playTactilePop();
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-2xl bg-slate-900 text-white shadow-md">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
              FocusSprint System Settings &amp; Preferences
            </h3>
            <p className="text-xs text-slate-400">
              Customize audio synthesis, OS sync, and vault thresholds
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Sound Synthesizer */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">
                  Procedural Audio Feedback
                </div>
                <div className="text-[11px] text-slate-500">
                  Sprint start chimes, batch pings, and emergency alerts
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              className={`btn-pill text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                muted ? "bg-slate-200 text-slate-700" : "bg-blue-600 text-white shadow-sm"
              }`}
            >
              {muted ? "Muted" : "Active"}
            </button>
          </div>

          {/* OS DND Auto-Sync */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">
                  Automatic OS DND Relay
                </div>
                <div className="text-[11px] text-slate-500">
                  Triggers device silent mode during active sprint blocks
                </div>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoDnd}
                onChange={() => setAutoDnd(!autoDnd)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          {/* Batching Sensitivity */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900">
                Batching Sensitivity Mode
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                {sensitivity}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(["lenient", "normal", "strict"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSensitivity(mode)}
                  className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    sensitivity === mode
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Vault */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">
                  Local Memory Vault Cache
                </div>
                <div className="text-[11px] text-slate-500">
                  Reset simulated stream notifications to default
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onResetVault) onResetVault();
                playTactilePop();
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Reset Vault
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">
            FocusSprint v2.4 &bull; Engineering Group 8
          </span>
          <button
            onClick={handleSave}
            className="btn-pill bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2 shadow-sm"
          >
            {savedFeedback ? "Saved!" : "Apply Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
