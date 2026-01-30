"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeExamStatus = exports.computeAcademicStrength = void 0;
const computeAcademicStrength = (gpa) => {
    if (!gpa)
        return "AVERAGE";
    if (gpa >= 8)
        return "STRONG";
    if (gpa >= 7)
        return "AVERAGE";
    return "WEAK";
};
exports.computeAcademicStrength = computeAcademicStrength;
const computeExamStatus = (ieltsStatus, greStatus) => {
    const statuses = [ieltsStatus, greStatus];
    if (statuses.every((s) => s === "completed"))
        return "COMPLETED";
    if (statuses.some((s) => s === "planned" || s === "completed"))
        return "IN_PROGRESS";
    return "NOT_STARTED";
};
exports.computeExamStatus = computeExamStatus;
//# sourceMappingURL=scoring.js.map