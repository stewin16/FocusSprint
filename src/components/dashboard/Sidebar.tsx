"use client";

import React from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  Activity,
  Sliders,
  Settings,
  Plus,
  Zap,
} from "lucide-react";
import { NavTab } from "@/components/Navbar";
import { playTactilePop } from "@/components/AudioEffects";

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isSprintRunning: boolean;
  onOpenAddRule?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  isSprintRunning,
  onOpenAddRule,
  onOpenSettings,
  onOpenProfile,
}: SidebarProps) {
  const menuItems: { id: NavTab; icon: React.ElementType; label: string }[] = [
    { id: "sprint", icon: LayoutDashboard, label: "Dashboard & Sprint" },
    { id: "rules", icon: ShieldAlert, label: "Emergency Matrix" },
    { id: "rooms", icon: Users, label: "Peer Study Rooms" },
    { id: "wellness", icon: Activity, label: "Eudaimonic Flow" },
    { id: "architecture", icon: Sliders, label: "System Specs" },
  ];

  return (
    <aside className="w-16 sm:w-20 bg-[#0f172a] flex flex-col items-center justify-between py-6 px-2 shrink-0 select-none h-full border-r border-slate-800/40 z-20">
      {/* Brand Icon & Top Navigation */}
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onTabChange("sprint");
            playTactilePop();
          }}
          title="FocusSprint"
          className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform cursor-pointer"
        >
          <Zap className="w-5 h-5 fill-white text-white" />
        </button>

        {/* Navigation Tab Icons */}
        <nav className="flex flex-col items-center gap-2 w-full pt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  playTactilePop();
                }}
                title={item.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
                  isActive
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -left-1 w-1 h-4 bg-blue-500 rounded-r-full" />
                )}
                {/* Tooltip on hover */}
                <span className="absolute left-14 bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="flex flex-col items-center gap-3 w-full pb-2">
        {/* Active sprint pulsating indicator */}
        {isSprintRunning ? (
          <div
            title="Focus Sprint Active"
            className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center cursor-default"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </div>
        ) : (
          <div
            title="Sprint Standby"
            className="w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-slate-500" />
          </div>
        )}

        {/* Quick Add Custom Action */}
        <button
          onClick={() => {
            if (onOpenAddRule) {
              onOpenAddRule();
            } else {
              onTabChange("rules");
            }
            playTactilePop();
          }}
          title="Add Emergency Rule"
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            if (onOpenSettings) {
              onOpenSettings();
            } else {
              onTabChange("architecture");
            }
            playTactilePop();
          }}
          title="System Architecture Settings"
          className="w-8 h-8 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Profile Avatar with Online Dot */}
        <button
          onClick={() => {
            if (onOpenProfile) onOpenProfile();
            playTactilePop();
          }}
          title="Student Profile"
          className="relative pt-1 cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 border-2 border-slate-700 flex items-center justify-center text-xs font-bold text-slate-950 overflow-hidden shadow">
            <span className="font-semibold text-slate-900">RM</span>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0f172a]" />
        </button>
      </div>
    </aside>
  );
}
