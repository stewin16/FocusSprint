"use client";

import React, { useState } from "react";
import {
  Users,
  Flame,
  Sparkles,
  BookOpen,
  Clock,
  HeartHandshake,
  Plus,
  CheckCircle2,
  DoorOpen,
} from "lucide-react";
import { PeerLeaderboardProps } from "./types";
import PeerCard from "./PeerCard";
import { playTactilePop, playSprintStartSound } from "@/components/AudioEffects";

export default function PeerLeaderboard({
  rooms,
  students,
  activeRoomId,
  onSelectRoom,
  onHighFive,
}: PeerLeaderboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCourse, setNewRoomCourse] = useState("");
  const [joinedRoomId, setJoinedRoomId] = useState(activeRoomId);
  const [joinToast, setJoinToast] = useState<string | null>(null);

  const currentRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  // Accurately filter students for the selected study room
  const roomStudents = students.filter((s) => {
    if (activeRoomId === "room-compilers") {
      return (
        s.room.toLowerCase().includes("compiler") ||
        s.subject.toLowerCase().includes("compiler") ||
        s.subject.toLowerCase().includes("structures")
      );
    }
    if (activeRoomId === "room-hostel4") {
      return (
        s.room.toLowerCase().includes("hostel") ||
        s.subject.toLowerCase().includes("operating") ||
        s.subject.toLowerCase().includes("network")
      );
    }
    if (activeRoomId === "room-library") {
      return (
        s.room.toLowerCase().includes("library") ||
        s.subject.toLowerCase().includes("database")
      );
    }
    return s.room.toLowerCase().includes(currentRoom.name.substring(0, 6).toLowerCase());
  });

  const totalHighFives = students.reduce((acc, curr) => acc + curr.highFives, 0);

  const handleJoinRoom = () => {
    setJoinedRoomId(currentRoom.id);
    playSprintStartSound();
    setJoinToast(`Joined ${currentRoom.name}! You are now working in silent solidarity.`);
    setTimeout(() => setJoinToast(null), 3500);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    playTactilePop();
    setShowCreateModal(false);
    setJoinToast(`Study room "${newRoomName}" created successfully!`);
    setTimeout(() => setJoinToast(null), 3500);
    setNewRoomName("");
    setNewRoomCourse("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="modern-card p-6 sm:p-7 bg-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  Peer Dynamics &amp; Solidarity
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {rooms.length} Active Campus Study Rooms
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Group Focus Sprint Rooms &amp; Study Streaks
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl leading-relaxed">
                Positive accountability without toxic comparison. Engineering classmates protect focus collectively during lab projects and exam preparation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>{totalHighFives} High-Fives</span>
            </div>

            <button
              onClick={() => {
                setShowCreateModal(true);
                playTactilePop();
              }}
              className="btn-pill bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Join Toast Feedback */}
      {joinToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{joinToast}</span>
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateModal && (
        <form
          onSubmit={handleCreateRoom}
          className="modern-card p-6 bg-white border-blue-200/90 shadow-md shadow-blue-500/5 space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Create New Group Focus Study Room
            </h3>
            <span className="text-xs text-slate-400">Silent Sprint Mode</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Room Name:
              </label>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g. AI-402 Deep Learning Sprint"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Department / Course:
              </label>
              <input
                type="text"
                value={newRoomCourse}
                onChange={(e) => setNewRoomCourse(e.target.value)}
                placeholder="e.g. Computer Science Sem 6"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="btn-pill bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-pill bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 shadow-sm"
            >
              Open Study Room
            </button>
          </div>
        </form>
      )}

      {/* Room Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
          Active Room:
        </span>
        {rooms.map((room) => {
          const isSelected = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              onClick={() => {
                onSelectRoom(room.id);
                playTactilePop();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{room.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-600"
                }`}
              >
                {room.activeStudents} active
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Room Metadata Strip with Join CTA */}
      <div className="modern-card p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              {currentRoom.name}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {currentRoom.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {currentRoom.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Cumulative Focus
            </span>
            <span className="font-extrabold text-sm text-emerald-600">
              {currentRoom.totalFocusHours} hrs
            </span>
          </div>

          <button
            onClick={handleJoinRoom}
            className={`btn-pill text-xs px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
              joinedRoomId === currentRoom.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>{joinedRoomId === currentRoom.id ? "Currently In Room" : "Join This Room"}</span>
          </button>
        </div>
      </div>

      {/* Peer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomStudents.map((student) => (
          <PeerCard key={student.id} student={student} onHighFive={onHighFive} />
        ))}
      </div>
    </div>
  );
}
