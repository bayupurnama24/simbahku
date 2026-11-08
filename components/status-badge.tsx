import { STATUS_LABEL } from "@/lib/constants";
import { cn, deadlineState } from "@/lib/utils";
import type { PoinData, StatusPoin } from "@/types";
const statusConfig: Record<StatusPoin, { badge: string; dot: string }> = {
  SUDAH_DILAKSANAKAN: {
    badge: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-300/70 shadow-xs",
    dot: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
  },
  DALAM_PROSES: {
    badge: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border-amber-300/70 shadow-xs",
    dot: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]",
  },
  BELUM_DILAKSANAKAN: {
    badge: "bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-300/70 shadow-xs",
    dot: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]",
  },
  DIBATALKAN: {
    badge: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-300/70 shadow-xs",
    dot: "bg-gray-400 shadow-[0_0_6px_rgba(156,163,175,0.5)]",
  },
};

export function StatusBadge({ status }: { status: StatusPoin }) {
  const cfg = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold", cfg.badge)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function DeadlineBadge({ point }: { point: PoinData }) {
  const state = deadlineState(point);
  if (!state) return null;
  const isLate = state === "Terlambat";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold shadow-xs",
        isLate
          ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300"
          : "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-900 border-orange-300"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", isLate ? "bg-red-600" : "bg-orange-500")} />
      {state}
    </span>
  );
}
