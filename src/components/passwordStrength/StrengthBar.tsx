import { ShieldCheckIcon } from "lucide-react";
import { getPasswordStrength } from "./strengthEvaluator";

interface StrengthBarProps {
  length: number;
}

export const StrengthBar = ({ length }: StrengthBarProps) => {
  const { styles, percentage } = getPasswordStrength(length);
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-full rounded-full bg-gray-300">
        <div
          className={`${styles.bar} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <ShieldCheckIcon className={`${styles.text} mr-1 inline-block h-4 w-4`} />
    </div>
  );
};
