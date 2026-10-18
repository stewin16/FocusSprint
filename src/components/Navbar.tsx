"use client";

import React, { useState } from "react";
import {
  Flame,
  ShieldAlert,
  Users,
  Activity,
  Sliders,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";
import { getAudioMuted, setAudioMuted, playTactilePop } from "@/components/AudioEffects";

export type NavTab = "sprint" | "rules" | "rooms" | "wellness" | "architecture";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isSprintRunning: boolean;
  onQuickStartSprint?: () => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  isSprintRunning,
  onQuickStartSprint,
}: NavbarProps) {
  const [muted, setMutedState] = useState(getAudioMuted());

  const toggleSound = () => {
    const nextMuted = !muted;
    setAudioMuted(nextMuted);
    setMutedState(nextMuted);
    if (!nextMuted) playTactilePop();
  };

  const navItems: { id: NavTab; label: string; icon: React.ElementType; color: string }[] = [
    { id: "sprint", label: "Sprint Console", icon: Flame, color: "text-amber-500" },
    { id: "rules", label: "Emergency Matrix", icon: ShieldAlert, color: "text-rose-500" },
    { id: "rooms", label: "Peer Rooms", icon: Users, color: "text-cyan-500" },
    { id: "wellness", label: "Eudaimonic Flow", icon: Activity, color: "text-emerald-500" },
    { id: "architecture", label: "Architecture", icon: Sliders, color: "text-purple-500" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-slate-950 bg-white/95 backdrop-blur-md shadow-[0_4px_0px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Pill */}
        <button
          onClick={() => {
            onTabChange("sprint");
            playTactilePop();
          }}
          className="flex items-center gap-3 text-left bg-transparent border-none p-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white border-2 border-slate-950 shadow-[3px_3px_0px_#0f172a] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-lg tracking-tight text-slate-950">
                FOCUS<span className="text-amber-500">SPRINT</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-300 text-slate-950 border border-slate-950">
                v1.0
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Engineering Deep-Work & Notification Vault
            </p>
          </div>
        </button>

        {/* Neo-Brutalist Nav Pills */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border-2 border-slate-950 shadow-[3px_3px_0px_#0f172a]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  playTactilePop();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold tracking-wide transition-all border cursor-pointer ${
                  isActive
                    ? "bg-slate-950 text-white border-slate-950 shadow-[2px_2px_0px_#0f172a]"
                    : "border-transparent text-slate-700 hover:text-slate-950 hover:bg-white/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleSound}
            title={muted ? "Unmute Audio Cues" : "Mute Audio Cues"}
            className="p-2 rounded-xl border-2 border-slate-950 bg-white text-slate-800 shadow-[2px_2px_0px_#0f172a] hover:bg-slate-100 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Telemetry Node Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border-2 border-slate-950 text-emerald-950 text-xs font-mono font-black shadow-[2px_2px_0px_#0f172a]">
            <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
            <span>Campus Relay: Online</span>
          </div>

          {/* Quick Start Sprint CTA */}
          <button
            onClick={() => {
              if (onQuickStartSprint) onQuickStartSprint();
              playTactilePop();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 border-2 border-slate-950 shadow-[4px_4px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer ${
              isSprintRunning
                ? "bg-rose-500 text-white"
                : "bg-amber-400 hover:bg-amber-300 text-slate-950"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSprintRunning ? "Sprint Active" : "Sprint Mode"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Row */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 border-t-2 border-slate-950 bg-slate-50 overflow-x-auto gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                playTactilePop();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap border ${
                isActive
                  ? "bg-slate-950 text-white border-slate-950 shadow-[2px_2px_0px_#0f172a]"
                  : "bg-white text-slate-700 border-slate-950"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
