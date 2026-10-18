"use client";

import React from "react";
import { NavTab } from "@/components/Navbar";

interface DashboardFooterProps {
  onNavigateTab: (tab: NavTab) => void;
}

export default function DashboardFooter({ onNavigateTab }: DashboardFooterProps) {
  return (
    <footer className="w-full pt-6 pb-2 text-center text-xs text-slate-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200 mt-8">
      <div>
        FocusSprint &bull; Engineering Deep-Work &amp; Notification Batching System &bull; Team 3: Digital Life
      </div>
      <div className="flex items-center gap-4 text-slate-600">
        <button
          onClick={() => onNavigateTab("sprint")}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Sprint Console
        </button>
        <button
          onClick={() => onNavigateTab("rules")}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Emergency Rules
        </button>
        <button
          onClick={() => onNavigateTab("rooms")}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Peer Rooms
        </button>
        <button
          onClick={() => onNavigateTab("wellness")}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Eudaimonic Flow
        </button>
      </div>
    </footer>
  );
}
