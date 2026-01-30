type Strength = "STRONG" | "AVERAGE" | "WEAK";
type ExamStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const computeAcademicStrength = (gpa?: number): Strength => {
  if (!gpa) return "AVERAGE";
  if (gpa >= 8) return "STRONG";
  if (gpa >= 7) return "AVERAGE";
  return "WEAK";
};

export const computeExamStatus = (ieltsStatus: string, greStatus: string): ExamStatus => {
  const statuses = [ieltsStatus, greStatus];
  if (statuses.every((s) => s === "completed")) return "COMPLETED";
  if (statuses.some((s) => s === "planned" || s === "completed")) return "IN_PROGRESS";
  return "NOT_STARTED";
};
