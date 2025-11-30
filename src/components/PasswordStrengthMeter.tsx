// src/components/PasswordStrengthMeter.tsx
import { Check, X } from "lucide-react";
import {
  checkPasswordStrength,
  type PasswordStrength,
} from "../utils/validation";

interface Props {
  password: string;
}

export default function PasswordStrengthMeter({ password }: Props) {
  const strength: PasswordStrength = checkPasswordStrength(password);

  const requirementsList = [
    "8+ characters",
    "Upper & lower case",
    "Contains number",
    "Special character (!@#$ etc.)",
  ];

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Label */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Password Strength
        </span>
        <span
          className={`text-sm font-bold ${
            strength.score >= 3 ? "text-green-600" : "text-gray-600"
          }`}
        >
          {strength.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${strength.color}`}
          style={{ width: `${(strength.score / 4) * 100}%` }}
        />
      </div>

      {/* Requirements Checklist */}
      <ul className="text-xs space-y-1.5">
        {requirementsList.map((req) => {
          const met = strength.requirements.includes(req);
          return (
            <li key={req} className="flex items-center gap-2">
              {met ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-gray-400" />
              )}
              <span
                className={met ? "text-green-700 font-medium" : "text-gray-500"}
              >
                {req}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
