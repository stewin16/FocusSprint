import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function SkeletonLoader({ className = "h-4 w-full", count = 1 }: SkeletonProps) {
  return (
    <div className="space-y-2 w-full animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-slate-200 border border-slate-300 rounded ${className}`}
        />
      ))}
    </div>
  );
}
