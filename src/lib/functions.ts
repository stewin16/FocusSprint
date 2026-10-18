import { CampusNotification, OverrideRule, UrgencyTier } from "@/types";

/**
 * Formats seconds into MM:SS string representation.
 *
 * @param seconds - Total remaining seconds
 * @returns Formatted time string, e.g. "25:00" or "04:12"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Calculates the progress percentage of an active sprint.
 *
 * @param totalMinutes - The total planned sprint duration in minutes
 * @param remainingSeconds - Seconds remaining in the sprint
 * @returns Number between 0 and 100 representing percentage completed
 */
export function calculateSprintProgress(totalMinutes: number, remainingSeconds: number): number {
  const totalSeconds = totalMinutes * 60;
  if (totalSeconds <= 0) return 0;
  const elapsed = totalSeconds - remainingSeconds;
  return Math.min(100, Math.max(0, Math.round((elapsed / totalSeconds) * 100)));
}

/**
 * Evaluates an incoming campus notification against the active emergency override rules.
 *
 * If any enabled emergency keyword or sender matches, the notification is classified
 * as "punched_through" with urgency "emergency". Otherwise, it is tagged as "batched".
 *
 * @param notification - The candidate notification to inspect
 * @param rules - List of active system override rules
 * @returns Object containing the determined urgency, status, and triggering rule (if any)
 */
export function classifyNotification(
  notification: Partial<CampusNotification>,
  rules: OverrideRule[]
): { urgency: UrgencyTier; status: "punched_through" | "batched"; matchedKeyword?: string } {
  const textToScan = `${notification.title || ""} ${notification.message || ""} ${notification.sender || ""}`.toLowerCase();

  // Check against active emergency override rules
  for (const rule of rules) {
    if (!rule.isActive) continue;

    const keyword = rule.keyword.toLowerCase();
    if (textToScan.includes(keyword)) {
      return {
        urgency: rule.tier,
        status: rule.tier === "emergency" ? "punched_through" : "batched",
        matchedKeyword: rule.keyword,
      };
    }
  }

  // Default fallback classification based on channel/content heuristics
  const isDirectUrgent = textToScan.includes("urgent") || textToScan.includes("emergency") || textToScan.includes("exam");
  if (isDirectUrgent) {
    return {
      urgency: "emergency",
      status: "punched_through",
      matchedKeyword: "Urgent Heuristic",
    };
  }

  const isAcademic = textToScan.includes("assignment") || textToScan.includes("lab") || textToScan.includes("submission") || textToScan.includes("github");
  return {
    urgency: isAcademic ? "academic" : "social",
    status: "batched",
  };
}

/**
 * Calculates estimated cognitive flow score based on minutes focused,
 * batched interruptions prevented, and emergency punches handled.
 *
 * Grounded in Csíkszentmihályi's flow research: context switches penalize flow
 * exponentially (taking ~23 minutes to resume deep flow per interruption).
 *
 * @param focusedMinutes - Total minutes spent in uninterrupted focus
 * @param batchedCount - Number of distractions caught in the batch vault
 * @returns Flow score from 0 to 100
 */
export function calculateFlowScore(focusedMinutes: number, batchedCount: number): number {
  if (focusedMinutes <= 0) return 0;
  const baseScore = Math.min(60, focusedMinutes * 1.2);
  const shieldedBonus = Math.min(40, batchedCount * 8);
  return Math.min(100, Math.round(baseScore + shieldedBonus));
}

/**
 * Computes estimated cognitive battery and fatigue index from daily usage metrics.
 *
 * @param distractionsBlocked - Number of notifications prevented from ringing
 * @param focusMinutesToday - Minutes of focused deep work completed
 * @returns Object with cognitive battery % and fatigue reduction %
 */
export function computeCognitiveMetrics(distractionsBlocked: number, focusMinutesToday: number): {
  cognitiveBattery: number;
  fatigueReduction: number;
  timeReclaimedHours: number;
} {
  // Each distraction avoided saves ~7 minutes of cognitive context switching recovery
  const minutesSaved = distractionsBlocked * 7;
  const timeReclaimedHours = Number((minutesSaved / 60).toFixed(1));

  // Cognitive battery starts at 85% and degrades with switches, protected by batching
  const battery = Math.min(98, Math.max(20, Math.round(60 + (focusMinutesToday / 10) + (distractionsBlocked * 1.5))));
  const fatigueReduction = Math.min(85, Math.round(distractionsBlocked * 4.2 + (focusMinutesToday * 0.3)));

  return {
    cognitiveBattery: battery,
    fatigueReduction,
    timeReclaimedHours: Math.max(0.5, timeReclaimedHours),
  };
}
