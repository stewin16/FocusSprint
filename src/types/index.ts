/**
 * FocusSprint Core Type Definitions
 * Strict types for notifications, focus sprints, rule filtering, peer rooms, and wellness telemetry.
 */

export type UrgencyTier = "emergency" | "academic" | "social";

export type NotificationStatus = "batched" | "punched_through" | "reviewed";

export interface CampusNotification {
  id: string;
  sender: string;
  senderRole?: "Professor" | "TA" | "Classmate" | "College Admin" | "Social App" | "Family";
  channel: "WhatsApp" | "Discord" | "Campus ERP" | "Email" | "Instagram" | "Slack" | "Social App";
  channelIcon: string;
  avatarColor: string;
  title: string;
  message: string;
  timestamp: string;
  urgency: UrgencyTier;
  status: NotificationStatus;
  triggeredKeyword?: string;
  read?: boolean;
}

export type SprintStatus = "idle" | "running" | "paused" | "completed";

export interface SprintSession {
  id: string;
  name: string;
  durationMinutes: number;
  timeRemainingSeconds: number;
  status: SprintStatus;
  startedAt?: Date;
  completedAt?: Date;
  batchedCount: number;
  punchedThroughCount: number;
  focusScore: number;
}

export interface OverrideRule {
  id: string;
  keyword: string;
  category: "Exam & Deadlines" | "Faculty VIP" | "College Admin" | "Family Emergency";
  tier: UrgencyTier;
  description: string;
  isActive: boolean;
  bypassSilent: boolean;
}

export interface PeerStudent {
  id: string;
  name: string;
  rollNo: string;
  avatar: string;
  currentTask: string;
  subject: string;
  focusMinutesToday: number;
  streakDays: number;
  status: "in_flow" | "break" | "idle";
  room: string;
  highFives: number;
}

export interface PeerRoom {
  id: string;
  name: string;
  code: string;
  course: string;
  activeStudents: number;
  totalFocusHours: number;
  roomLead: string;
  description: string;
}

export interface WellnessTelemetry {
  cognitiveBatteryPercent: number;
  contextSwitchesPrevented: number;
  hoursReclaimed: number;
  flowStateIndex: number; // 0 - 100
  hedonicDistractionRatio: number; // % of impulse resistance
  fatigueReductionPercent: number;
}

export interface SprintProgram {
  id: string;
  name: string;
  category: string;
  participantCount: number;
  avatars: string[];
  progressPercent: number;
  segmentsActive: number;
  dueDate: string;
  avgScore: number;
}

export interface SubjectMetric {
  name: string;
  score: number;
  barPercent: number;
}

export interface RoleDistribution {
  label: string;
  count: number;
  color: string;
}

export interface DeepWorkTimeMetric {
  bars: { height: number }[];
  tags: string[];
  improvementText: string;
}

export interface SprintCompletionMetric {
  percent: number;
  footnote: string;
}

export interface MobileAchievement {
  title: string;
  score: string;
  icon: string;
  barColor: string;
  barPercent: number;
}

export interface BatchingStreamMetrics {
  totalBatched: number;
  dailyAverage: number;
  focusSavedHours: number;
  academicPercent: number;
  socialPercent: number;
  footnote: string;
}

