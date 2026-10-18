"use client";

import React from "react";
import ActiveProgramsCard from "@/components/dashboard/ActiveProgramsCard";
import StatusOverviewCard from "@/components/dashboard/StatusOverviewCard";
import SprintConsole from "@/components/sprint/SprintConsole";
import NotificationVault from "@/components/sprint/NotificationVault";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import SpendingBatchingCard from "@/components/dashboard/SpendingBatchingCard";
import LearningTimeCard from "@/components/dashboard/LearningTimeCard";
import CompletionRateCard from "@/components/dashboard/CompletionRateCard";
import NotificationStreamSimulator from "@/components/sprint/NotificationStreamSimulator";
import { CampusNotification, SprintSession } from "@/types";

interface SprintDashboardTabProps {
  session: SprintSession;
  notifications: CampusNotification[];
  batchedCount: number;
  onStartSprint: (mins: number, label: string) => void;
  onPauseSprint: () => void;
  onResumeSprint: () => void;
  onStopSprint: () => void;
  onResetSprint: () => void;
  onInjectNotification: (notif: CampusNotification) => void;
}

export default function SprintDashboardTab({
  session,
  notifications,
  batchedCount,
  onStartSprint,
  onPauseSprint,
  onResumeSprint,
  onStopSprint,
  onResetSprint,
  onInjectNotification,
}: SprintDashboardTabProps) {
  const isRunning = session.status === "running";

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Row: Active Programs (60%) & Status Overview (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <ActiveProgramsCard
            onStartSprint={onStartSprint}
            isSprintRunning={isRunning}
          />
        </div>
        <div className="lg:col-span-5">
          <StatusOverviewCard />
        </div>
      </div>

      {/* Middle Row: The Active Sprint Controller & Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <SprintConsole
            session={session}
            onStart={onStartSprint}
            onPause={onPauseSprint}
            onResume={onResumeSprint}
            onStop={onStopSprint}
            onReset={onResetSprint}
          />
        </div>
        <div className="lg:col-span-5">
          <NotificationVault
            notifications={notifications}
            timeRemainingSeconds={session.timeRemainingSeconds}
            isSprintRunning={isRunning}
            onReleaseEarly={onStopSprint}
          />
        </div>
      </div>

      {/* Bottom Row: 4 Metric Cards in the exact theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3">
          <PerformanceCard />
        </div>

        <div className="lg:col-span-4">
          <SpendingBatchingCard
            onInject={onInjectNotification}
            batchedCount={batchedCount}
          />
        </div>

        <div className="lg:col-span-2">
          <LearningTimeCard />
        </div>

        <div className="lg:col-span-3">
          <CompletionRateCard />
        </div>
      </div>

      {/* Notification Interceptor Simulator */}
      <NotificationStreamSimulator
        onInjectNotification={onInjectNotification}
        isSprintRunning={isRunning}
      />
    </div>
  );
}
