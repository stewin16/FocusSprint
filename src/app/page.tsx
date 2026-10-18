"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SprintDashboardTab from "@/components/dashboard/SprintDashboardTab";
import EmergencyMatrix from "@/components/rules/EmergencyMatrix";
import LiveRuleTester from "@/components/rules/LiveRuleTester";
import PeerLeaderboard from "@/components/rooms/PeerLeaderboard";
import FlowStateVisualizer from "@/components/wellness/FlowStateVisualizer";
import CognitiveFatigueCalculator from "@/components/wellness/CognitiveFatigueCalculator";
import EudaimonicComparison from "@/components/wellness/EudaimonicComparison";
import ArchitectureFlow from "@/components/architecture/ArchitectureFlow";
import FocusDigestModal from "@/components/sprint/FocusDigestModal";
import FocusCoachHUD from "@/components/FocusCoachHUD";
import EmergencyOverrideBanner from "@/components/sprint/EmergencyOverrideBanner";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import QuickAddRuleModal from "@/components/dashboard/QuickAddRuleModal";
import SystemSettingsModal from "@/components/dashboard/SystemSettingsModal";
import StudentProfileModal from "@/components/dashboard/StudentProfileModal";

import { NavTab } from "@/components/Navbar";
import {
  initialOverrideRules,
  mockIncomingStream,
  mockPeerRooms,
  mockPeerStudents,
} from "@/lib/mockData";
import { CampusNotification, OverrideRule, SprintSession } from "@/types";
import { classifyNotification } from "@/lib/functions";
import { playSprintCompleteSound } from "@/components/AudioEffects";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("sprint");
  const [rules, setRules] = useState<OverrideRule[]>(initialOverrideRules);
  const [notifications, setNotifications] = useState<CampusNotification[]>(mockIncomingStream);
  const [peerStudents, setPeerStudents] = useState(mockPeerStudents);
  const [activeRoomId, setActiveRoomId] = useState(mockPeerRooms[0].id);
  const [isDigestOpen, setIsDigestOpen] = useState(false);
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Focus Session State
  const [session, setSession] = useState<SprintSession>({
    id: "session-1",
    name: "CS-302 Compiler Lab Sprint",
    durationMinutes: 25,
    timeRemainingSeconds: 25 * 60,
    status: "running",
    batchedCount: 4,
    punchedThroughCount: 2,
    focusScore: 94,
  });

  // URL Hash Sync for state retention
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "") as NavTab;
      if (["sprint", "rules", "rooms", "wellness", "architecture"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`);
    }
  };

  // 1-second timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (session.status === "running") {
      interval = setInterval(() => {
        setSession((prev) => {
          if (prev.timeRemainingSeconds <= 1) {
            clearInterval(interval!);
            setIsDigestOpen(true);
            playSprintCompleteSound();
            return { ...prev, timeRemainingSeconds: 0, status: "completed" };
          }
          return { ...prev, timeRemainingSeconds: prev.timeRemainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.status]);

  const handleStartSprint = (mins: number, label: string) => {
    setSession({
      id: `sprint-${Date.now()}`,
      name: label,
      durationMinutes: mins,
      timeRemainingSeconds: mins * 60,
      status: "running",
      startedAt: new Date(),
      batchedCount: notifications.filter((n) => n.status === "batched").length,
      punchedThroughCount: notifications.filter((n) => n.status === "punched_through").length,
      focusScore: 96,
    });
  };

  const handlePauseSprint = () => {
    setSession((prev) => ({ ...prev, status: "paused" }));
  };

  const handleResumeSprint = () => {
    setSession((prev) => ({ ...prev, status: "running" }));
  };

  const handleStopSprint = () => {
    setSession((prev) => ({ ...prev, status: "completed" }));
    setIsDigestOpen(true);
  };

  const handleResetSprint = () => {
    setSession((prev) => ({
      ...prev,
      status: "idle",
      timeRemainingSeconds: prev.durationMinutes * 60,
    }));
  };

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleAddRule = (
    keyword: string,
    category: OverrideRule["category"],
    description: string
  ) => {
    const newRule: OverrideRule = {
      id: `rule-${Date.now()}`,
      keyword,
      category,
      tier: "emergency",
      description,
      isActive: true,
      bypassSilent: true,
    };
    setRules((prev) => [newRule, ...prev]);
  };

  const handleInjectNotification = (notif: CampusNotification) => {
    const classification = classifyNotification(notif, rules);
    const resolved: CampusNotification = {
      ...notif,
      urgency: classification.urgency,
      status: classification.status,
      triggeredKeyword: classification.matchedKeyword,
    };

    setNotifications((prev) => [resolved, ...prev]);
    setSession((prev) => ({
      ...prev,
      batchedCount: prev.batchedCount + (resolved.status === "batched" ? 1 : 0),
      punchedThroughCount:
        prev.punchedThroughCount + (resolved.status === "punched_through" ? 1 : 0),
    }));
  };

  const handleDismissEmergency = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, status: "reviewed" } : n))
    );
  };

  const handleDismissAllEmergencies = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.urgency === "emergency" && n.status === "punched_through"
          ? { ...n, read: true, status: "reviewed" }
          : n
      )
    );
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetVault = () => {
    setNotifications(mockIncomingStream);
  };

  const handleHighFive = (studentId: string) => {
    setPeerStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, highFives: s.highFives + 1 } : s))
    );
  };

  const batchedOnly = notifications.filter((n) => n.status === "batched");

  return (
    <div className="h-screen w-screen bg-[#f4f7fb] p-3 sm:p-5 flex flex-col font-sans text-slate-900 overflow-hidden">
      {/* Main FocusSprint Window: Sidebar is permanently fixed at the side, content scrolls smoothly */}
      <div className="max-w-[1720px] w-full mx-auto bg-white/75 backdrop-blur-md rounded-[32px] shadow-2xl border border-slate-200/90 flex flex-row overflow-hidden flex-1 min-h-0 animate-fade-in">
        {/* Left Sleek Sidebar: 100% height, permanently fixed, never scrolls */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isSprintRunning={session.status === "running"}
          onOpenAddRule={() => setIsAddRuleOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Right Main Content Area: Scrolls smoothly inside while sidebar stays fixed */}
        <main className="flex-1 h-full overflow-y-auto p-5 sm:p-7 min-w-0 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Top Header */}
            <Header
              studentName="Rahul"
              onStartSprint={() => handleStartSprint(25, "CS-302 Compiler Lab Sprint")}
              isSprintRunning={session.status === "running"}
              onNavigateTab={handleTabChange}
              rules={rules}
              notifications={notifications}
            />

            {/* Emergency Banner (Top Alert) */}
            <EmergencyOverrideBanner
              notifications={notifications}
              onDismiss={handleDismissEmergency}
              onDismissAll={handleDismissAllEmergencies}
            />

            {/* TAB 1: SPRINT & DASHBOARD */}
            {activeTab === "sprint" && (
              <SprintDashboardTab
                session={session}
                notifications={notifications}
                batchedCount={batchedOnly.length}
                onStartSprint={handleStartSprint}
                onPauseSprint={handlePauseSprint}
                onResumeSprint={handleResumeSprint}
                onStopSprint={handleStopSprint}
                onResetSprint={handleResetSprint}
                onInjectNotification={handleInjectNotification}
              />
            )}

            {/* TAB 2: RULES MATRIX */}
            {activeTab === "rules" && (
              <div className="space-y-6 animate-fade-in">
                <EmergencyMatrix
                  rules={rules}
                  onToggleRule={handleToggleRule}
                  onAddRule={handleAddRule}
                  onDeleteRule={handleDeleteRule}
                />
                <LiveRuleTester rules={rules} />
              </div>
            )}

            {/* TAB 3: PEER ROOMS */}
            {activeTab === "rooms" && (
              <div className="animate-fade-in">
                <PeerLeaderboard
                  rooms={mockPeerRooms}
                  students={peerStudents}
                  activeRoomId={activeRoomId}
                  onSelectRoom={setActiveRoomId}
                  onHighFive={handleHighFive}
                />
              </div>
            )}

            {/* TAB 4: WELLNESS */}
            {activeTab === "wellness" && (
              <div className="space-y-6 animate-fade-in">
                <FlowStateVisualizer
                  distractionsShieldedToday={batchedOnly.length}
                  focusMinutesToday={session.durationMinutes}
                />
                <CognitiveFatigueCalculator />
                <EudaimonicComparison />
              </div>
            )}

            {/* TAB 5: ARCHITECTURE */}
            {activeTab === "architecture" && (
              <div className="animate-fade-in">
                <ArchitectureFlow />
              </div>
            )}
          </div>

          {/* Modern Clean Footer for FocusSprint */}
          <DashboardFooter onNavigateTab={handleTabChange} />
        </main>
      </div>

      {/* Floating AI Coach HUD */}
      <FocusCoachHUD />

      {/* Post-Sprint Digest Modal */}
      <FocusDigestModal
        isOpen={isDigestOpen}
        session={session}
        batchedNotifications={batchedOnly}
        onClose={() => setIsDigestOpen(false)}
      />

      {/* Quick Add Rule Modal */}
      <QuickAddRuleModal
        isOpen={isAddRuleOpen}
        onClose={() => setIsAddRuleOpen(false)}
        onAddRule={handleAddRule}
      />

      {/* System Settings Modal */}
      <SystemSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetVault={handleResetVault}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        studentName="Rahul"
      />
    </div>
  );
}
