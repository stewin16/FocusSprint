"use client";

import React from "react";
import { AlertOctagon, Check, CheckCheck, ShieldAlert } from "lucide-react";
import { CampusNotification } from "@/types";
import { playTactilePop } from "@/components/AudioEffects";

interface EmergencyBannerProps {
  notifications: CampusNotification[];
  onDismiss: (id: string) => void;
  onDismissAll?: () => void;
}

export default function EmergencyOverrideBanner({
  notifications,
  onDismiss,
  onDismissAll,
}: EmergencyBannerProps) {
  const activeEmergencies = notifications.filter(
    (n) => n.urgency === "emergency" && n.status === "punched_through"
  );

  if (activeEmergencies.length === 0) return null;

  return (
    <div className="space-y-3 mb-6 animate-fade-in">
      {/* Top Header if multiple */}
      {activeEmergencies.length > 1 && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold text-rose-950 uppercase tracking-wider">
              {activeEmergencies.length} Critical Emergency Bypasses Active
            </span>
          </div>
          <button
            onClick={() => {
              if (onDismissAll) {
                onDismissAll();
              } else {
                activeEmergencies.forEach((a) => onDismiss(a.id));
              }
              playTactilePop();
            }}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Acknowledge All ({activeEmergencies.length})</span>
          </button>
        </div>
      )}

      {activeEmergencies.map((alert) => (
        <div
          key={alert.id}
          className="p-4 sm:p-5 rounded-2xl border border-rose-200/90 bg-rose-50/90 shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          {/* Subtle Accent Bar */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500 rounded-l-2xl" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pl-2">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-sm shrink-0 mt-0.5 sm:mt-0">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white uppercase tracking-wider">
                    Emergency Punch-Through
                  </span>
                  <span className="text-xs font-semibold text-rose-900">
                    From: {alert.sender}
                  </span>
                  {alert.triggeredKeyword && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 border border-rose-300">
                      Rule: {alert.triggeredKeyword}
                    </span>
                  )}
                  <span className="text-[10px] text-rose-600 font-medium">
                    {alert.timestamp}
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-rose-950">
                  {alert.title}
                </h4>
                <p className="text-xs sm:text-sm text-rose-800 font-medium mt-0.5 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>

            {/* Acknowledge Button */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-2">
              <button
                onClick={() => {
                  onDismiss(alert.id);
                  playTactilePop();
                }}
                className="btn-pill bg-rose-950 hover:bg-rose-900 text-white text-xs font-semibold px-4 py-2 shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Acknowledge</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
