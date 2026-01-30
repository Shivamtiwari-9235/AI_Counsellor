type Strength = "STRONG" | "AVERAGE" | "WEAK";
type ExamStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export declare const computeAcademicStrength: (gpa?: number) => Strength;
export declare const computeExamStatus: (ieltsStatus: string, greStatus: string) => ExamStatus;
export {};
//# sourceMappingURL=scoring.d.ts.map