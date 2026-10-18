import {
  BatchingStreamMetrics,
  DeepWorkTimeMetric,
  MobileAchievement,
  RoleDistribution,
  SprintCompletionMetric,
  SprintProgram,
  SubjectMetric,
} from "@/types";

export const mockSprintPrograms: SprintProgram[] = [
  {
    id: "prog-1",
    name: "CS-302 Compiler Design Lab",
    category: "Lexer & Parser Milestone",
    participantCount: 32,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    ],
    progressPercent: 96,
    segmentsActive: 10,
    dueDate: "7 Jan 2026",
    avgScore: 4.8,
  },
  {
    id: "prog-2",
    name: "CS-304 Operating Systems Lab",
    category: "Virtual Memory Pager",
    participantCount: 6,
    avatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    ],
    progressPercent: 24,
    segmentsActive: 3,
    dueDate: "4 Jan 2026",
    avgScore: 4.4,
  },
  {
    id: "prog-3",
    name: "CS-201 Dynamic Programming",
    category: "Tree DP Problem Sets",
    participantCount: 16,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    ],
    progressPercent: 46,
    segmentsActive: 5,
    dueDate: "26 Dec 2025",
    avgScore: 5.0,
  },
];

export const mockSubjectMetrics: SubjectMetric[] = [
  { name: "Compiler Design Lab", score: 4.9, barPercent: 95 },
  { name: "Operating Systems Kernel", score: 4.4, barPercent: 84 },
  { name: "Dynamic Programming Trees", score: 3.9, barPercent: 74 },
  { name: "Computer Networks", score: 3.5, barPercent: 66 },
  { name: "Database Lab", score: 1.8, barPercent: 36 },
  { name: "Academic WhatsApp Noise", score: 0.9, barPercent: 18 },
];

export const mockRoleDistribution: RoleDistribution[] = [
  { label: "Faculty VIP", count: 16, color: "bg-blue-500" },
  { label: "Junior Peers", count: 28, color: "bg-rose-400" },
  { label: "In Deep Flow", count: 37, color: "bg-purple-500" },
  { label: "Lab TAs", count: 12, color: "bg-amber-400" },
  { label: "Shielded in Vault", count: 61, color: "bg-emerald-500" },
];

export const mockDeepWorkTime: DeepWorkTimeMetric = {
  bars: [
    { height: 40 },
    { height: 60 },
    { height: 85 },
    { height: 100 },
    { height: 75 },
    { height: 50 },
  ],
  tags: ["22h", "38h"],
  improvementText: "Engineering team spent 18% more focus hours vs last week.",
};

export const mockSprintCompletion: SprintCompletionMetric = {
  percent: 76,
  footnote: "Completion rate is 12% higher than it was last month.",
};

export const mockMobileAchievements: MobileAchievement[] = [
  {
    title: "Focus Sprint Master",
    score: "4/5",
    icon: "🏆",
    barColor: "bg-amber-400",
    barPercent: 80,
  },
  {
    title: "Lab Exam Shield",
    score: "1/5",
    icon: "🛡️",
    barColor: "bg-slate-300",
    barPercent: 20,
  },
  {
    title: "Solidarity Study Streak",
    score: "2/2",
    icon: "🌱",
    barColor: "bg-emerald-500",
    barPercent: 100,
  },
  {
    title: "Cognitive Continuity",
    score: "5/10",
    icon: "👑",
    barColor: "bg-purple-500",
    barPercent: 50,
  },
];

export const mockBatchingStreamMetrics: BatchingStreamMetrics = {
  totalBatched: 24,
  dailyAverage: 18,
  focusSavedHours: 2.3,
  academicPercent: 32,
  socialPercent: 68,
  footnote: "Academic chat updates are held safely in the vault; social reels are silenced.",
};
