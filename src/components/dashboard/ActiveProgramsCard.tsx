"use client";

import React from "react";
import { ArrowUpRight, Info, Play, Medal } from "lucide-react";
import { playSprintStartSound } from "@/components/AudioEffects";
import { mockSprintPrograms } from "@/lib/mockData";
import { SprintProgram } from "@/types";

interface ActiveProgramsCardProps {
  programs?: SprintProgram[];
  onStartSprint?: (mins: number, label: string) => void;
  isSprintRunning?: boolean;
}

export default function ActiveProgramsCard({
  programs = mockSprintPrograms,
  onStartSprint,
  isSprintRunning,
}: ActiveProgramsCardProps) {
  return (
    <div className="modern-card p-5 sm:p-6 bg-white relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Card Header matching theme */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Active Focus &amp; Lab Sprints
            </h3>
            <button
              title="Focus block information"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            title="Expand view"
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 uppercase tracking-wider py-3 border-b border-slate-50">
          <div className="col-span-4">Course / Lab</div>
          <div className="col-span-2 text-center">Classmates</div>
          <div className="col-span-3 text-center">Progress</div>
          <div className="col-span-2 text-center">Deadline</div>
          <div className="col-span-1 text-right">Flow Score</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-50">
          {programs.map((item) => (
            <div
              key={item.id}
                onClick={() => {
                  if (onStartSprint) onStartSprint(25, `${item.name} Sprint`);
                  playSprintStartSound();
                }}
                className="grid grid-cols-12 items-center py-3.5 hover:bg-blue-50/50 cursor-pointer transition-all rounded-xl px-2 group"
                title={`Click to engage 25m Focus Sprint for ${item.name}`}
              >
                {/* Lab Title & Category */}
                <div className="col-span-4 pr-2">
                  <div className="font-semibold text-xs text-slate-800 tracking-tight truncate group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate">
                    {item.category}
                  </div>
                </div>

                {/* Classmates Overlapping Avatars */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center -space-x-2">
                    {item.avatars.map((av, idx) => (
                      <img
                        key={idx}
                        src={av}
                        alt="Student"
                        className="w-5 h-5 rounded-full border border-white object-cover"
                      />
                    ))}
                    <span className="text-[10px] font-bold text-slate-600 pl-2">
                      +{item.participantCount}
                    </span>
                  </div>
                </div>

                {/* Segmented Green Progress Bar (theme match) */}
                <div className="col-span-3 flex items-center justify-center gap-2">
                  <div className="flex gap-0.5 items-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 sm:w-1.5 h-3 rounded-[1px] transition-colors ${
                          i < item.segmentsActive ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 w-8 text-right">
                    {item.progressPercent}%
                  </span>
                </div>

                {/* Deadline */}
                <div className="col-span-2 text-center text-xs text-slate-600 font-medium">
                  {item.dueDate}
                </div>

                {/* Flow Score with Gold Medal */}
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <Medal className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="font-bold text-xs text-slate-800">
                    {item.avgScore}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Launch Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          {isSprintRunning ? "Focus vault active: distractions silenced" : "Click any course row to start focus block"}
        </span>
        <button
          onClick={() => {
            if (onStartSprint) onStartSprint(25, "CS-302 Compiler Lab Sprint");
            playSprintStartSound();
          }}
          className={`btn-pill text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            isSprintRunning
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{isSprintRunning ? "Sprint In Progress" : "Start 25m Focus Sprint"}</span>
        </button>
      </div>
    </div>
  );
}
