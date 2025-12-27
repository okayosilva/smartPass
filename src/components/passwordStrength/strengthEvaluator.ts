export type StrengthLevel = "weak" | "medium" | "strong" | "veryStrong";

type StyleStrength = {
  bar: string;
  text: string;
};

interface StrengthMetrics {
  label: StrengthLevel;
  styles: StyleStrength;
  percentage: number;
}

const STRENGTH_MAP: Record<StrengthLevel, StrengthMetrics> = {
  weak: {
    label: "weak",
    percentage: 33,
    styles: { bar: "bg-red-500", text: "text-red-600" },
  },
  medium: {
    label: "medium",
    percentage: 66,
    styles: { bar: "bg-yellow-500", text: "text-yellow-700" },
  },
  strong: {
    label: "strong",
    percentage: 75,
    styles: { bar: "bg-emerald-500", text: "text-emerald-600" },
  },
  veryStrong: {
    label: "strong",
    percentage: 100,
    styles: { bar: "bg-emerald-500", text: "text-emerald-600" },
  },
};

export const getPasswordStrength = (length: number): StrengthMetrics => {
  if (length <= 6) return STRENGTH_MAP.weak;
  if (length <= 8) return STRENGTH_MAP.medium;
  if (length >= 9 && length <= 10) return STRENGTH_MAP.strong;

  return STRENGTH_MAP.veryStrong;
};
