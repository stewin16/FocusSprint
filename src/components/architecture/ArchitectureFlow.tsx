"use client";

import React, { useState } from "react";
import {
  Layers,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Lock,
  Unlock,
  Sliders,
  CheckCircle2,
  Cpu,
  Radio,
  Play,
  RotateCcw,
} from "lucide-react";
import { playBatchInterceptionSound, playEmergencyAlertSound, playTactilePop } from "@/components/AudioEffects";

export default function ArchitectureFlow() {
  const [activeSimStep, setActiveSimStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simVerdict, setSimVerdict] = useState<string | null>(null);

  const steps = [
    {
      num: "01",
      title: "Notification Intake Relay",
      role: "Member 1 & 2 Findings",
      description:
        "Intercepts background push notifications from academic groups (WhatsApp, Discord) and social apps (Instagram, Snapchat) across the device.",
      badge: "Intake",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      num: "02",
      title: "Priority Override Parser",
      role: "Member 3 Architecture",
      description:
        "Evaluates sender role (Professors, HOD, Exam Cell) and critical keywords ('Lab Exam', 'Deadline', 'Room Shift') against active rules in <2ms.",
      badge: "Classifier",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      num: "03",
      title: "The Focus Batch Vault",
      role: "Member 4 Wireframe",
      description:
        "Non-urgent notifications are silently queued into memory. Screen remains dark, vibrations are silenced, and ambient FOMO anxiety is neutralized.",
      badge: "Batching",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      num: "04",
      title: "Emergency Punch-Through",
      role: "Safety Mechanism",
      description:
        "If an alert matches an active emergency rule, it immediately punches through with high-priority audio chime and visual banner so critical news is never lost.",
      badge: "VIP Bypass",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      num: "05",
      title: "Sprint Digest Release",
      role: "Member 5 & 6 Wellness",
      description:
        "Upon session completion, the vault unlocks and presents a single, structured digest. Students review updates without breaking cognitive flow.",
      badge: "Eudaimonic Digest",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const runSimulation = (isEmergency: boolean) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimVerdict(null);
    playTactilePop();

    // Step 1
    setActiveSimStep(0);
    setTimeout(() => {
      // Step 2
      setActiveSimStep(1);
      setTimeout(() => {
        // Step 3 or 4
        if (isEmergency) {
          setActiveSimStep(3);
          playEmergencyAlertSound();
          setSimVerdict("Emergency Rule Matched! Bypassing silent mode with VIP audio alert.");
        } else {
          setActiveSimStep(2);
          playBatchInterceptionSound();
          setSimVerdict("Low Priority Distraction. Silently encrypted & batched into Vault.");
        }
        setTimeout(() => {
          // Step 5 (if sprint complete)
          if (!isEmergency) {
            setActiveSimStep(4);
          }
          setIsSimulating(false);
        }, 1200);
      }, 900);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  System Architecture &bull; Full Pipeline
                </span>
                <span className="text-xs text-slate-400 font-medium">&lt;1.4ms Pipeline Latency</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                FocusSprint Technical Architecture &amp; Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl leading-relaxed">
                How FocusSprint intercepts, classifies, vaults, and safely releases campus notifications without creating academic FOMO.
              </p>
            </div>
          </div>

          {/* Interactive Simulation CTAs */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => runSimulation(false)}
              disabled={isSimulating}
              className="btn-pill bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2 shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Trace Social Ping</span>
            </button>
            <button
              onClick={() => runSimulation(true)}
              disabled={isSimulating}
              className="btn-pill bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2 shadow-sm shadow-rose-500/20 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Trace Emergency Alert</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Banner */}
        {simVerdict && (
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>{simVerdict}</span>
            </div>
            <button
              onClick={() => {
                setActiveSimStep(null);
                setSimVerdict(null);
              }}
              className="text-slate-400 hover:text-slate-600 text-[11px] underline"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* 5-Stage Step Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {steps.map((s, idx) => {
          const isCurrentActive = activeSimStep === idx;
          return (
            <div
              key={idx}
              className={`modern-card p-5 bg-white flex flex-col justify-between transition-all duration-300 ${
                isCurrentActive
                  ? "ring-2 ring-blue-600 shadow-lg scale-102 bg-blue-50/20"
                  : "hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-extrabold text-slate-300">
                    {s.num}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeColor}`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1 tracking-tight">
                  {s.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold block mb-2 uppercase">
                  {s.role}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Stage {idx + 1} of 5</span>
                {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-slate-300" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Comparison: FocusSprint vs Android/iOS DND */}
      <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden space-y-4">
        <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
          Why Standard &ldquo;Do Not Disturb&rdquo; (DND) Fails Engineering Students
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="modern-card-sm p-5 bg-slate-50/70 border-slate-200/80">
            <span className="text-rose-600 font-bold text-sm block mb-2">
              Standard OS Do Not Disturb (DND):
            </span>
            <ul className="space-y-2 text-slate-600 font-medium list-disc list-inside leading-relaxed">
              <li>Binary on/off switch: either blocks everything or lets everything buzz.</li>
              <li>Forces students into continuous ambient FOMO regarding lab updates.</li>
              <li>Students repeatedly unlock their phones to check if they missed notices.</li>
              <li>Zero group study solidarity or eudaimonic reflection metrics.</li>
            </ul>
          </div>

          <div className="modern-card-sm p-5 bg-gradient-to-br from-emerald-50/50 to-white border-emerald-200/90 shadow-sm shadow-emerald-500/5">
            <span className="text-emerald-800 font-bold text-sm block mb-2">
              FocusSprint Intelligent System:
            </span>
            <ul className="space-y-2 text-slate-800 font-medium list-disc list-inside leading-relaxed">
              <li>Batches non-urgent pings into a silent vault released after sprint blocks.</li>
              <li>Keyword &amp; faculty override filter guarantees emergency notices arrive immediately.</li>
              <li>Peer study rooms foster shared accountability and non-toxic streaks.</li>
              <li>Tracks real flow-state continuity and cognitive battery recovery.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
