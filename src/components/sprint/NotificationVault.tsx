"use client";

import React, { useState } from "react";
import {
  Lock,
  Unlock,
  MessageCircle,
  Hash,
  Camera,
  Coffee,
  ShieldCheck,
  Inbox,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { NotificationVaultProps } from "./types";
import { formatTime } from "@/lib/functions";
import { playTactilePop } from "@/components/AudioEffects";

export default function NotificationVault({
  notifications,
  timeRemainingSeconds,
  isSprintRunning,
  onReleaseEarly,
}: NotificationVaultProps) {
  const [filter, setFilter] = useState<"all" | "academic" | "social">("all");

  const batchedOnly = notifications.filter((n) => n.status === "batched");
  const filtered = batchedOnly.filter((n) => {
    if (filter === "all") return true;
    return n.urgency === filter;
  });

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "whatsapp":
        return <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case "discord":
        return <Hash className="w-3.5 h-3.5 text-indigo-600" />;
      case "instagram":
        return <Camera className="w-3.5 h-3.5 text-pink-600" />;
      default:
        return <Coffee className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="modern-card p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header with info dot and expand arrow */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 tracking-tight">
              Notification Batch Vault
            </h3>
            <button title="Vault info" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {batchedOnly.length} held
            </span>
            <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              setFilter("all");
              playTactilePop();
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({batchedOnly.length})
          </button>
          <button
            onClick={() => {
              setFilter("academic");
              playTactilePop();
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === "academic"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Academic ({batchedOnly.filter((n) => n.urgency === "academic").length})
          </button>
          <button
            onClick={() => {
              setFilter("social");
              playTactilePop();
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === "social"
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Social ({batchedOnly.filter((n) => n.urgency === "social").length})
          </button>
        </div>

        {/* Notification Cards */}
        <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/60">
              <Inbox className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="font-semibold text-xs text-slate-700">
                Vault is currently quiet
              </div>
              <div className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                Non-urgent academic group messages and social pings are held here silently during focus blocks.
              </div>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-slate-100 flex items-center justify-center">
                      {getChannelIcon(item.channel)}
                    </div>
                    <span className="font-bold text-xs text-slate-800 truncate max-w-[140px] sm:max-w-none">
                      {item.sender}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.urgency === "academic"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-pink-50 text-pink-700 border border-pink-200/60"
                      }`}
                    >
                      {item.channel}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.timestamp}
                  </span>
                </div>

                <div className="font-semibold text-xs text-slate-800 mb-0.5">
                  {item.title}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.message}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-indigo-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Held Silently in Vault</span>
                  </span>
                  <span>Release on Sprint Finish</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer info & Early Unlock button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3 text-xs">
        <span className="text-slate-400 font-medium">
          Auto-release in {formatTime(timeRemainingSeconds)}
        </span>
        {batchedOnly.length > 0 && isSprintRunning && onReleaseEarly && (
          <button
            onClick={() => {
              onReleaseEarly();
              playTactilePop();
            }}
            className="btn-pill text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
          >
            <Unlock className="w-3 h-3 text-slate-600" />
            <span>Unlock Vault Early</span>
          </button>
        )}
      </div>
    </div>
  );
}
