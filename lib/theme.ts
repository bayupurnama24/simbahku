// Palet warna energik & kuat, berakar pada identitas Merah Maroon KPU (#800000 / #660300)
// dipadukan dengan spektrum warna referensi:
// - Maroon (#800000)
// - Crimson Red (#FF0000)
// - Flame Orange (#FF4500)
// - Radiant Gold (#FFD700)
// - Vivid Green (#008000 / #10B981)

export const PALETTE = {
  maroon: "#800000",
  maroonDark: "#4a0000",
  scarlet: "#dc2626",
  flame: "#ff4500",
  gold: "#ffd700",
  amber: "#f59e0b",
  emerald: "#008000",
  teal: "#0d9488",
  cyan: "#06b6d4",
  electricBlue: "#2563eb",
  violet: "#7c3aed",
  magenta: "#d946ef",
} as const;

// Definisi status dengan warna primer dan pasangan gradien energik
export const STAT_THEME = {
  berita: {
    color: "#800000",
    from: "#800000",
    to: "#b91c1c",
    rgb: "128, 0, 0",
  },
  poin: {
    color: "#2563eb",
    from: "#1d4ed8",
    to: "#06b6d4",
    rgb: "37, 99, 235",
  },
  progress: {
    color: "#7c3aed",
    from: "#7c3aed",
    to: "#ec4899",
    rgb: "124, 58, 237",
  },
  selesai: {
    color: "#059669",
    from: "#10b981",
    to: "#008000",
    rgb: "16, 185, 129",
  },
  proses: {
    color: "#d97706",
    from: "#ffd700",
    to: "#ea580c",
    rgb: "245, 158, 11",
  },
  belum: {
    color: "#dc2626",
    from: "#ff4500",
    to: "#800000",
    rgb: "220, 38, 38",
  },
  evidence: {
    color: "#0284c7",
    from: "#0284c7",
    to: "#38bdf8",
    rgb: "2, 132, 199",
  },
  perhatian: {
    color: "#ea580c",
    from: "#ff4500",
    to: "#f59e0b",
    rgb: "234, 88, 12",
  },
} as const;

export const STAT_COLORS = {
  berita: STAT_THEME.berita.color,
  poin: STAT_THEME.poin.color,
  progress: STAT_THEME.progress.color,
  selesai: STAT_THEME.selesai.color,
  proses: STAT_THEME.proses.color,
  belum: STAT_THEME.belum.color,
  evidence: STAT_THEME.evidence.color,
  perhatian: STAT_THEME.perhatian.color,
} as const;

// 12 Warna Gradien Energik per Bulan (Januari - Desember)
// Mengalir dinamis dari Maroon -> Merah Terang -> Oranye Api -> Emas -> Hijau -> Cyan -> Biru -> Ungu -> Magenta -> Maroon
export const MONTH_GRADIENTS = [
  { name: "Jan", from: "#800000", to: "#dc2626", color: "#991b1b" }, // Maroon ke Merah
  { name: "Feb", from: "#dc2626", to: "#ff4500", color: "#ef4444" }, // Merah ke Oranye Api
  { name: "Mar", from: "#ff4500", to: "#f59e0b", color: "#ea580c" }, // Oranye Api ke Amber
  { name: "Apr", from: "#f59e0b", to: "#ffd700", color: "#d97706" }, // Amber ke Emas
  { name: "Mei", from: "#eab308", to: "#10b981", color: "#84cc16" }, // Emas ke Hijau
  { name: "Jun", from: "#10b981", to: "#008000", color: "#059669" }, // Hijau Emerald
  { name: "Jul", from: "#059669", to: "#06b6d4", color: "#0d9488" }, // Teal ke Cyan
  { name: "Agu", from: "#06b6d4", to: "#2563eb", color: "#0284c7" }, // Cyan ke Biru Elektrik
  { name: "Sep", from: "#2563eb", to: "#7c3aed", color: "#3b82f6" }, // Biru ke Ungu
  { name: "Okt", from: "#7c3aed", to: "#d946ef", color: "#9333ea" }, // Ungu ke Magenta
  { name: "Nov", from: "#d946ef", to: "#f43f5e", color: "#e11d48" }, // Magenta ke Rose
  { name: "Des", from: "#f43f5e", to: "#800000", color: "#be123c" }, // Rose ke Maroon
] as const;

export const MONTH_COLORS = MONTH_GRADIENTS.map((m) => m.color);
