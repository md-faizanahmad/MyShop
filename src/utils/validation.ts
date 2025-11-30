// src/utils/validation.ts
export const validateName = (name: string): string | true => {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (/^\d+$/.test(trimmed)) return "Name cannot be only numbers";
  if (!/[a-zA-Z]/.test(trimmed)) return "Name must contain at least one letter";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  return true;
};

export const validateCustomEmail = (email: string): string | true => {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) return "Email is required";

  // Block phone numbers
  if (/^\d{8,}$/.test(trimmed)) {
    return "Email cannot be a phone number.";
  }

  // Basic correct email shape
  const basicPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!basicPattern.test(trimmed)) {
    return "Enter a valid email (e.g. alex@gmail.com)";
  }

  // Optional: restrict to only @gmail.com
  if (!trimmed.endsWith("@gmail.com")) {
    return "Only Gmail addresses are supported (e.g. alex@gmail.com)";
  }

  return true;
};

export type PasswordStrength = {
  score: number; // 0–4
  label: string;
  color: string;
  requirements: string[];
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const requirements: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
    requirements.push("8+ characters");
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
    requirements.push("Upper & lower case");
  }
  if (/\d/.test(password)) {
    score++;
    requirements.push("Contains number");
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
    requirements.push("Special character (!@#$ etc.)");
  }

  const labels = ["Too weak", "Weak", "Good", "Strong", "Very Strong!"];
  const colors = [
    "bg-gray-400",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return {
    score: score === 0 ? 0 : score,
    label: labels[score],
    color: colors[score],
    requirements,
  };
};
