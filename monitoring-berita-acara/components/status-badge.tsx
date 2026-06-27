import { STATUS_LABEL } from "@/lib/constants";
import { cn, deadlineState } from "@/lib/utils";
import type { PoinData, StatusPoin } from "@/types";
const styles:Record<StatusPoin,string>={SUDAH_DILAKSANAKAN:"bg-green-50 text-green-700 border-green-200",DALAM_PROSES:"bg-amber-50 text-amber-700 border-amber-200",BELUM_DILAKSANAKAN:"bg-red-50 text-red-700 border-red-200"};
export function StatusBadge({status}:{status:StatusPoin}){return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-bold",styles[status])}>{STATUS_LABEL[status]}</span>}
export function DeadlineBadge({point}:{point:PoinData}){const state=deadlineState(point);if(!state)return null;return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold",state==="Terlambat"?"bg-red-100 text-red-700":"bg-orange-100 text-orange-700")}>{state}</span>}
