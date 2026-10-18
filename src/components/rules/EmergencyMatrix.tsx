"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Plus,
  Trash2,
  Check,
  Search,
  Filter,
  Info,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { EmergencyMatrixProps } from "./types";
import { OverrideRule } from "@/types";
import { playTactilePop } from "@/components/AudioEffects";

export default function EmergencyMatrix({
  rules,
  onToggleRule,
  onAddRule,
  onDeleteRule,
}: EmergencyMatrixProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<OverrideRule["category"]>("Exam & Deadlines");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please specify a priority trigger keyword or faculty name.");
      return;
    }
    setError("");
    onAddRule(
      keyword.trim(),
      category,
      description.trim() || `Bypasses silent mode for messages containing '${keyword.trim()}'`
    );
    setKeyword("");
    setDescription("");
    setShowAddForm(false);
    playTactilePop();
  };

  const categories: OverrideRule["category"][] = [
    "Exam & Deadlines",
    "Faculty VIP",
    "College Admin",
    "Family Emergency",
  ];

  const filteredRules = rules.filter((r) => {
    const matchesSearch =
      r.keyword.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeCount = rules.filter((r) => r.isActive).length;

  const getCategoryBadgeClass = (cat: OverrideRule["category"]) => {
    switch (cat) {
      case "Exam & Deadlines":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Faculty VIP":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "College Admin":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Modern Top Card Overview */}
      <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Priority Override Engine
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeCount} of {rules.length} Rules Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Emergency Priority Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl leading-relaxed">
                FocusSprint completely eliminates FOMO by intelligently letting critical academic deadlines, professor updates, and family emergencies punch through while silencing social noise.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              playTactilePop();
            }}
            className="btn-pill bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 shadow-sm shadow-blue-500/20 shrink-0 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? "Close Form" : "Create Override Rule"}</span>
          </button>
        </div>
      </div>

      {/* Add Rule Form Modal / Expandable Card */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="modern-card p-6 bg-white border-blue-200/80 shadow-md shadow-blue-500/5 space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Add Custom Emergency Bypass Rule
            </h3>
            <span className="text-xs text-slate-400">Instant Evaluation</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Trigger Keyword or Sender Name:
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Lab Viva, Placement, Prof. Sharma"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as OverrideRule["category"])}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
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
                placeholder="Brief reason for punch-through bypass"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-pill bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-pill bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2 shadow-sm shadow-emerald-500/20"
            >
              Save Rule
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setCategoryFilter("all");
              playTactilePop();
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Categories ({rules.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                playTactilePop();
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search keywords or rules..."
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Modern Rule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className={`modern-card p-5 sm:p-6 bg-white flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
              rule.isActive ? "border-slate-200/90" : "opacity-60 bg-slate-50/50"
            }`}
          >
            <div>
              {/* Category pill & Toggle */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                    rule.category
                  )}`}
                >
                  {rule.category}
                </span>

                <div className="flex items-center gap-2.5">
                  {/* Clean Modern Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.isActive}
                      onChange={() => {
                        onToggleRule(rule.id);
                        playTactilePop();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                  </label>

                  {onDeleteRule && (
                    <button
                      onClick={() => {
                        onDeleteRule(rule.id);
                        playTactilePop();
                      }}
                      title="Delete rule"
                      className="text-slate-300 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Keyword Title */}
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="font-bold text-base text-slate-900 tracking-tight">
                  &ldquo;{rule.keyword}&rdquo;
                </h4>
                {rule.isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                )}
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {rule.description}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-semibold text-rose-600">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Punches Through Batch Vault</span>
              </span>
              <span className="text-slate-400 font-medium">VIP Audio Chime</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
