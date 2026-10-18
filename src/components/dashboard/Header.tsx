"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Play,
  Radio,
  BookOpen,
  ShieldAlert,
  Users,
  Bell,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";
import { playTactilePop, playSprintStartSound } from "@/components/AudioEffects";
import { NavTab } from "@/components/Navbar";
import { CampusNotification, OverrideRule, PeerRoom, SprintProgram } from "@/types";
import { mockSprintPrograms, mockPeerRooms } from "@/lib/mockData";

interface HeaderProps {
  studentName?: string;
  onStartSprint?: (mins?: number, label?: string) => void;
  isSprintRunning?: boolean;
  onNavigateTab?: (tab: NavTab) => void;
  rules?: OverrideRule[];
  notifications?: CampusNotification[];
  programs?: SprintProgram[];
  rooms?: PeerRoom[];
}

export default function Header({
  studentName = "Rahul",
  onStartSprint,
  isSprintRunning,
  onNavigateTab,
  rules = [],
  notifications = [],
  programs = mockSprintPrograms,
  rooms = mockPeerRooms,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsFocused(true);
      }
      if (e.key === "Escape") {
        setIsFocused(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const query = searchQuery.trim().toLowerCase();

  // Search results
  const matchingPrograms = query
    ? programs.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  const matchingRules = query
    ? rules.filter(
        (r) =>
          r.keyword.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      )
    : [];

  const matchingNotifications = query
    ? notifications.filter(
        (n) =>
          n.sender.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query) ||
          n.channel.toLowerCase().includes(query)
      )
    : [];

  const matchingRooms = query
    ? rooms.filter(
        (rm) =>
          rm.name.toLowerCase().includes(query) ||
          rm.course.toLowerCase().includes(query)
      )
    : [];

  const totalMatches =
    matchingPrograms.length +
    matchingRules.length +
    matchingNotifications.length +
    matchingRooms.length;

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 select-none relative z-30">
      {/* Left: Greeting & Subtitle */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            Team 3: Digital Life
          </span>
          <span className="text-xs text-slate-400 font-medium">B.Tech Engineering &bull; 8-Person Group</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Good Morning, {studentName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          FocusSprint is actively shielding your deep work blocks from notification fatigue.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {/* Search Input Bar with Command Palette */}
        <div ref={containerRef} className="relative flex-1 sm:w-72 md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, rules, vault..."
            className="w-full pl-10 pr-12 py-2 rounded-full bg-white border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsFocused(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
              ⌘ K
            </span>
          )}

          {/* Floating Search Results Dropdown */}
          {isFocused && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 sm:w-96 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 max-h-[380px] overflow-y-auto animate-fade-in z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                <span>Search Results ({totalMatches})</span>
                <span className="text-[10px]">Esc to dismiss</span>
              </div>

              {totalMatches === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching courses, rules, or alerts found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Courses */}
                  {matchingPrograms.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Courses &amp; Labs
                      </span>
                      <div className="space-y-1">
                        {matchingPrograms.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              if (onStartSprint) onStartSprint(25, `${p.name} Sprint`);
                              if (onNavigateTab) onNavigateTab("sprint");
                              playSprintStartSound();
                              setIsFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-2 rounded-xl hover:bg-blue-50/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                          >
                            <div>
                              <div className="font-semibold text-slate-900">{p.name}</div>
                              <div className="text-[10px] text-slate-400">{p.category}</div>
                            </div>
                            <span className="btn-pill bg-blue-600 text-white text-[10px] px-2.5 py-1">
                              Start Sprint
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rules */}
                  {matchingRules.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Emergency Override Rules
                      </span>
                      <div className="space-y-1">
                        {matchingRules.map((r) => (
                          <div
                            key={r.id}
                            onClick={() => {
                              if (onNavigateTab) onNavigateTab("rules");
                              playTactilePop();
                              setIsFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                              <span className="font-semibold text-slate-900">&ldquo;{r.keyword}&rdquo;</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {r.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {matchingNotifications.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Notification Vault
                      </span>
                      <div className="space-y-1">
                        {matchingNotifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              if (onNavigateTab) onNavigateTab("sprint");
                              playTactilePop();
                              setIsFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                          >
                            <div className="flex items-center justify-between text-[11px] mb-0.5">
                              <span className="font-bold text-slate-800">{n.sender}</span>
                              <span className="text-[10px] text-slate-400">{n.channel}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 truncate">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rooms */}
                  {matchingRooms.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Peer Study Rooms
                      </span>
                      <div className="space-y-1">
                        {matchingRooms.map((rm) => (
                          <div
                            key={rm.id}
                            onClick={() => {
                              if (onNavigateTab) onNavigateTab("rooms");
                              playTactilePop();
                              setIsFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-2 rounded-xl hover:bg-cyan-50/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                          >
                            <div className="font-semibold text-slate-900">{rm.name}</div>
                            <span className="text-[10px] text-cyan-700 font-bold">
                              {rm.activeStudents} active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Telemetry Relay pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Relay: Online</span>
        </div>

        {/* Sprint Action Button */}
        <button
          onClick={() => {
            if (onStartSprint) onStartSprint(25, "CS-302 Compiler Lab Sprint");
            playTactilePop();
          }}
          className={`btn-pill text-xs font-semibold shadow-sm cursor-pointer ${
            isSprintRunning
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{isSprintRunning ? "Vault Active" : "Start Sprint"}</span>
        </button>
      </div>
    </header>
  );
}
