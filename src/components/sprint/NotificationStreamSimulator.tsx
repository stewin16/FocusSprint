"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Zap,
  MessageCircle,
  AlertTriangle,
  Camera,
  Bell,
  RefreshCw,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { SimulatorProps } from "./types";
import { CampusNotification } from "@/types";
import { mockSampleInjections } from "@/lib/mockData";
import {
  playBatchInterceptionSound,
  playEmergencyAlertSound,
  playTactilePop,
} from "@/components/AudioEffects";

export default function NotificationStreamSimulator({
  onInjectNotification,
  isSprintRunning,
}: SimulatorProps) {
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [customSender, setCustomSender] = useState("Class WhatsApp");

  useEffect(() => {
    if (!autoSimulate || !isSprintRunning) return;

    const interval = setInterval(() => {
      const randomSample = mockSampleInjections[Math.floor(Math.random() * mockSampleInjections.length)];
      inject(randomSample);
    }, 7000);

    return () => clearInterval(interval);
  }, [autoSimulate, isSprintRunning]);

  const inject = (sample: CampusNotification) => {
    const notif: CampusNotification = {
      ...sample,
      id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (notif.status === "punched_through") {
      playEmergencyAlertSound();
    } else {
      playBatchInterceptionSound();
    }

    onInjectNotification(notif);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    const isUrgent =
      customMsg.toLowerCase().includes("urgent") ||
      customMsg.toLowerCase().includes("exam") ||
      customMsg.toLowerCase().includes("deadline") ||
      customMsg.toLowerCase().includes("prof");

    const newNotif: CampusNotification = {
      id: `custom-${Date.now()}`,
      sender: customSender,
      channel: isUrgent ? "Campus ERP" : "WhatsApp",
      channelIcon: isUrgent ? "AlertTriangle" : "MessageCircle",
      avatarColor: isUrgent ? "bg-rose-500" : "bg-emerald-500",
      title: isUrgent ? "Priority Alert" : "Group Chat Message",
      message: customMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      urgency: isUrgent ? "emergency" : "academic",
      status: isUrgent ? "punched_through" : "batched",
      triggeredKeyword: isUrgent ? "Urgency Match" : undefined,
    };

    if (isUrgent) {
      playEmergencyAlertSound();
    } else {
      playBatchInterceptionSound();
    }

    onInjectNotification(newNotif);
    setCustomMsg("");
  };

  return (
    <div className="modern-card p-6 bg-white relative overflow-hidden">
      {/* Header with info dot and expand arrow */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-base text-slate-900 tracking-tight">
            Live Notification Interceptor Sandbox
          </h3>
          <button title="Simulator info" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto loop toggle pill */}
          <button
            onClick={() => {
              setAutoSimulate(!autoSimulate);
              playTactilePop();
            }}
            className={`btn-pill text-xs px-3 py-1 font-semibold transition-all ${
              autoSimulate
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${autoSimulate ? "animate-spin text-emerald-600" : ""}`} />
            <span>{autoSimulate ? "Auto-Stream: ON" : "Auto-Stream: OFF"}</span>
          </button>

          <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Trigger Pills */}
      <div className="mb-5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Trigger Realistic Campus Injections:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => inject(mockSampleInjections[0])}
            className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-950 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Lab Exam Emergency</span>
            </div>
            <div className="text-[10px] text-rose-700 truncate">
              Punches through with audio chime
            </div>
          </button>

          <button
            onClick={() => inject(mockSampleInjections[1])}
            className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-950 mb-0.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Academic Q</span>
            </div>
            <div className="text-[10px] text-emerald-700 truncate">
              Silently held in Batch Vault
            </div>
          </button>

          <button
            onClick={() => inject(mockSampleInjections[2])}
            className="p-3 rounded-2xl bg-pink-50/70 hover:bg-pink-100/80 border border-pink-200 text-left transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-pink-950 mb-0.5">
              <Camera className="w-3.5 h-3.5 text-pink-600" />
              <span>Instagram Reel Ping</span>
            </div>
            <div className="text-[10px] text-pink-700 truncate">
              Distraction locked in Vault
            </div>
          </button>

          <button
            onClick={() => inject(mockSampleInjections[3])}
            className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-950 mb-0.5">
              <Bell className="w-3.5 h-3.5 text-amber-700" />
              <span>Exam Portal Deadline</span>
            </div>
            <div className="text-[10px] text-amber-800 truncate">
              Keyword bypass triggered
            </div>
          </button>
        </div>
      </div>

      {/* Custom Test Form */}
      <form onSubmit={handleCustomSend} className="space-y-2">
        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Custom Notification Classifier Test:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customSender}
            onChange={(e) => setCustomSender(e.target.value)}
            placeholder="Sender..."
            className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="e.g. 'Lab exam postponed by Prof. Sharma' or 'Let's get chai'"
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="btn-pill bg-slate-900 text-white text-xs font-semibold px-4 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inject</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
