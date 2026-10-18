"use client";

import React, { useState } from "react";
import { X, ShieldAlert, Plus } from "lucide-react";
import { OverrideRule } from "@/types";
import { playTactilePop } from "@/components/AudioEffects";

interface QuickAddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRule: (keyword: string, category: OverrideRule["category"], description: string) => void;
}

export default function QuickAddRuleModal({
  isOpen,
  onClose,
  onAddRule,
}: QuickAddRuleModalProps) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<OverrideRule["category"]>("Exam & Deadlines");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please specify a priority trigger keyword or name.");
      return;
    }
    setError("");
    onAddRule(
      keyword.trim(),
      category,
      description.trim() || `Bypasses silent mode for alerts containing '${keyword.trim()}'`
    );
    setKeyword("");
    setDescription("");
    onClose();
    playTactilePop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/90 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 tracking-tight">
              Add Emergency Override Rule
            </h3>
            <p className="text-xs text-slate-400">
              Immediate bypass during active focus sprint
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Trigger Keyword or Professor Name:
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Lab Viva, Placement, Prof. Sharma"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as OverrideRule["category"])}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Exam & Deadlines">Exam &amp; Deadlines</option>
              <option value="Faculty VIP">Faculty VIP</option>
              <option value="College Admin">College Admin</option>
              <option value="Family Emergency">Family Emergency</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Reason / Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Critical notification that cannot wait"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-pill bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-pill bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 shadow-sm shadow-blue-500/20"
            >
              Create Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
