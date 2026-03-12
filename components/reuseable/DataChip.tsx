"use client";

import { X } from "lucide-react";

interface DataChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export const DataChip = ({ label, selected, onToggle }: DataChipProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-xl text-[11px] font-medium transition-all duration-300 border ${
        selected
          ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-2">
        {label}
        {selected && <X size={10} className="text-cyan-400/50" />}
      </div>
    </button>
  );
};
