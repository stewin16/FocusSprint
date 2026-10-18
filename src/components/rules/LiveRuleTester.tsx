"use client";

import React, { useState } from "react";
import { Terminal, ShieldCheck, ShieldAlert, Sparkles, Volume2, Info, ArrowUpRight } from "lucide-react";
import { RuleTesterProps } from "./types";
import { classifyNotification } from "@/lib/functions";
import { playBatchInterceptionSound, playEmergencyAlertSound, playTactilePop } from "@/components/AudioEffects";

export default function LiveRuleTester({ rules }: RuleTesterProps) {
  const [testInput, setTestInput] = useState("URGENT: Lab Exam batch has been shifted to Hall B by Prof. Sharma");
  const [senderInput, setSenderInput] = useState("Faculty Portal");

  const classification = classifyNotification(
    { title: "Test Notification", message: testInput, sender: senderInput },
    rules
  );

  const testSamples = [
    { text: "Lab Exam postponed to Friday by Prof. Sharma", sender: "CS Notice Board" },
    { text: "Who has the assignment 3 PDF notes?", sender: "WhatsApp Study Group" },
    { text: "Final Deadline: verify exam portal fees by 5 PM", sender: "Campus ERP" },
    { text: "Bro did you see the new viral reel on IG?", sender: "Instagram" },
  ];

  const handleTest = () => {
    if (classification.status === "punched_through") {
      playEmergencyAlertSound();
    } else {
      playBatchInterceptionSound();
    }
  };

  const isEmergency = classification.status === "punched_through";

  return (
    <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
              Interactive Rule Classifier Sandbox
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Simulate and inspect how incoming notifications are parsed and routed in &lt;1.2ms
            </p>
          </div>
        </div>

        <button
          onClick={handleTest}
          className="btn-pill bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Play Sound Effect</span>
        </button>
      </div>

      {/* Quick Test Preset Chips */}
      <div className="mb-5">
        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Click A Realistic Scenario to Test:
        </label>
        <div className="flex flex-wrap gap-2">
          {testSamples.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTestInput(sample.text);
                setSenderInput(sample.sender);
                playTactilePop();
              }}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-all text-left cursor-pointer"
            >
              &ldquo;{sample.text.substring(0, 34)}...&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Sender:
          </label>
          <input
            type="text"
            value={senderInput}
            onChange={(e) => setSenderInput(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Notification Body / Alert Text:
          </label>
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Real-time Verdict Display */}
      <div
        className={`p-5 rounded-2xl border transition-all duration-300 ${
          isEmergency
            ? "bg-rose-50/70 border-rose-200/90 shadow-sm shadow-rose-500/5"
            : "bg-emerald-50/70 border-emerald-200/90 shadow-sm shadow-emerald-500/5"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {isEmergency ? (
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-sm">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Classification Result
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {isEmergency
                  ? "EMERGENCY BYPASS — Punch-Through Triggered"
                  : "NON-URGENT — Silently Vaulted in Batch Queue"}
              </div>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isEmergency
                ? "bg-rose-600 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            {isEmergency ? "High Priority" : "Batched"}
          </span>
        </div>

        {/* 3 Metrics breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/70 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Urgency Tier:</span>
            <span className="font-bold text-slate-900 uppercase">
              {classification.urgency}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Matched Trigger Rule:</span>
            <span className="font-bold text-slate-900">
              {classification.matchedKeyword ? `"${classification.matchedKeyword}"` : "None (General Queue)"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Action Protocol:</span>
            <span className="font-bold text-slate-900">
              {isEmergency ? "Immediate VIP Banner & Alert Chime" : "Silenced until Sprint Wraps"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
