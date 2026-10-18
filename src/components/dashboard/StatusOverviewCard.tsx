"use client";

import React from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { mockRoleDistribution } from "@/lib/mockData";
import { RoleDistribution } from "@/types";

interface StatusOverviewCardProps {
  distribution?: RoleDistribution[];
  totalPeers?: number;
  flowRatePercent?: number;
}

export default function StatusOverviewCard({
  distribution = mockRoleDistribution,
  totalPeers = 154,
  flowRatePercent = 84,
}: StatusOverviewCardProps) {
  return (
    <div className="modern-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
            Focus Status Overview
          </h3>
          <button title="Status info" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        <button title="Expand view" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Middle Row: Circular Donut Chart & Legend */}
      <div className="grid grid-cols-12 items-center py-4 gap-2">
        {/* Donut Chart */}
        <div className="col-span-7 flex items-center justify-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                className="text-slate-100 stroke-current"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                className="text-blue-500 stroke-current"
                strokeWidth="7"
                strokeDasharray="238.76"
                strokeDashoffset="60"
                strokeLinecap="round"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                className="text-emerald-500 stroke-current"
                strokeWidth="7"
                strokeDasharray="238.76"
                strokeDashoffset="130"
                strokeLinecap="round"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                className="text-amber-400 stroke-current"
                strokeWidth="7"
                strokeDasharray="238.76"
                strokeDashoffset="190"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner text matching theme */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalPeers}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Campus peers
              </span>
            </div>
          </div>
        </div>

        {/* Legend on Right */}
        <div className="col-span-5 space-y-1.5 text-[11px] font-medium text-slate-600 pl-2">
          {distribution.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 truncate">
                <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                <span className="truncate">{item.label}</span>
              </div>
              <span className="font-bold text-slate-800 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar with Flow Rate Tag */}
      <div className="space-y-1.5 pt-2">
        <div className="flex justify-end">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
            {flowRatePercent}% Flow Rate
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${flowRatePercent}%` }}
          />
        </div>
      </div>

      {/* Bottom Breakdown with Avatars */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Undergoing Sprint</span>
          </div>
          <div className="flex items-center -space-x-1.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="Avatar"
              className="w-5 h-5 rounded-full border border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="Avatar"
              className="w-5 h-5 rounded-full border border-white object-cover"
            />
            <span className="text-[10px] font-bold text-slate-700 pl-2">+132</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>On Hydration Break</span>
          </div>
          <div className="flex items-center -space-x-1.5">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Avatar"
              className="w-5 h-5 rounded-full border border-white object-cover"
            />
            <span className="text-[10px] font-bold text-slate-700 pl-2">+16</span>
          </div>
        </div>
      </div>
    </div>
  );
}
