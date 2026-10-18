"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Terminal,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { playTactilePop } from "@/components/AudioEffects";

interface Message {
  sender: "user" | "agent";
  text: string;
  time: string;
}

const quickQueries = [
  { label: "Why not standard DND?", query: "Why is FocusSprint better than standard Android/iOS Do Not Disturb?" },
  { label: "Peer Survey Findings", query: "What did the peer survey reveal about engineering distraction habits?" },
  { label: "Eudaimonic Wellness?", query: "How does FocusSprint foster Eudaimonic well-being instead of temporary hedonic relief?" },
  { label: "Emergency Overrides?", query: "How do priority rules prevent students from missing urgent lab exam notices?" },
];

export default function FocusCoachHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "Hello! I am your FocusSprint Presentation & Architecture Agent. I can answer questions about our 8-person engineering workflow, survey data, notification batching logic, or eudaimonic wellness connection. Click a topic below or ask anything:",
      time: "Just now",
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    playTactilePop();
    const userMsg: Message = {
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    setTimeout(() => {
      let responseText = "";
      const lower = q.toLowerCase();

      if (lower.includes("dnd") || lower.includes("do not disturb")) {
        responseText =
          "Standard OS DND is binary—it silences everything indiscriminately. This creates acute Fear of Missing Out (FOMO), forcing 90% of students to repeatedly unlock their phones to check for lab updates. FocusSprint replaces binary silence with intelligent notification batching and high-priority emergency punch-throughs.";
      } else if (lower.includes("survey") || lower.includes("peer") || lower.includes("data")) {
        responseText =
          "Our rapid digital peer survey across engineering students showed: (1) 80% lose 2+ hours daily to non-academic phone switches; (2) 70% identified academic group chat pings (WhatsApp/Discord) as their #1 trigger due to assignment FOMO; and (3) 90% reported past habit apps failed because total blocks created anxiety.";
      } else if (lower.includes("eudaimonic") || lower.includes("wellness") || lower.includes("flow")) {
        responseText =
          "FocusSprint targets Eudaimonic well-being (Aristotle & Csíkszentmihályi) rather than hedonic dopamine escapism. By protecting cognitive energy during complex engineering tasks, students enter deep 'flow states', eliminate late-night exhaustion, and feel authentic pride in their engineering craft.";
      } else if (lower.includes("override") || lower.includes("emergency") || lower.includes("rule")) {
        responseText =
          "FocusSprint's Emergency Priority Matrix inspects sender identities (Professors, HOD, Exam Cell) and critical tokens ('Lab Exam', 'Deadline', 'Room Shift'). When a match occurs, the notification punches through immediately with audio alerts and visual banners—zero latency.";
      } else {
        responseText =
          "Great question! FocusSprint is designed specifically for engineering student routines: combining scheduled deep-work sprints, encrypted notification batching, non-toxic peer study streaks, and eudaimonic flow protection so students excel academically without digital burnout.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Modern Pill Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            playTactilePop();
          }}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-950/25 border border-slate-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-tight">AI Focus Coach</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Expanded Modern Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-slate-200/90 animate-fade-in flex flex-col h-[520px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">
                  FocusSprint AI Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online &bull; Presentation Q&amp;A Ready</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                playTactilePop();
              }}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
            {quickQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.query)}
                className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-[11px] font-medium whitespace-nowrap text-slate-700 transition-all cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white ml-6 shadow-sm"
                    : "bg-slate-100 text-slate-800 mr-6"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-medium">
                  <span>{m.sender === "user" ? "You" : "FocusSprint Agent"}</span>
                  <span>{m.time}</span>
                </div>
                <div className="leading-relaxed font-normal">{m.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="pt-3 border-t border-slate-100 mt-2 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about architecture, DND, survey..."
              className="flex-1 px-3.5 py-2 rounded-full border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="submit"
              className="btn-pill px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
