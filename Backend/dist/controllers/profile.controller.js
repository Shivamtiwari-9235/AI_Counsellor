"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeOnboarding = exports.getProfile = void 0;
const db_1 = require("../config/db");
const scoring_1 = require("../utils/scoring");
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await db_1.pool.query("SELECT * FROM user_profile WHERE user_id=$1", [userId]);
        res.json(result.rows[0] || null);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};
exports.getProfile = getProfile;
const completeOnboarding = async (req, res) => {
    try {
        const userId = req.user.userId;
        const body = req.body;
        const gpaNumber = body.gpa ? parseFloat(body.gpa) : undefined;
        const academicStrength = (0, scoring_1.computeAcademicStrength)(gpaNumber);
        const examStrength = (0, scoring_1.computeExamStatus)(body.ieltsStatus, body.greStatus);
        // upsert profile
        await db_1.pool.query(`
      INSERT INTO user_profile (
        user_id, current_education_level, degree_major, graduation_year, gpa,
        intended_degree, field_of_study, target_intake_year, preferred_countries,
        budget_range_per_year, funding_plan, ielts_status, gre_status, sop_status
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
      )
      ON CONFLICT (user_id) DO UPDATE SET
        current_education_level = EXCLUDED.current_education_level,
        degree_major = EXCLUDED.degree_major,
        graduation_year = EXCLUDED.graduation_year,
        gpa = EXCLUDED.gpa,
        intended_degree = EXCLUDED.intended_degree,
        field_of_study = EXCLUDED.field_of_study,
        target_intake_year = EXCLUDED.target_intake_year,
        preferred_countries = EXCLUDED.preferred_countries,
        budget_range_per_year = EXCLUDED.budget_range_per_year,
        funding_plan = EXCLUDED.funding_plan,
        ielts_status = EXCLUDED.ielts_status,
        gre_status = EXCLUDED.gre_status,
        sop_status = EXCLUDED.sop_status,
        updated_at = now()
      `, [
            userId,
            body.currentEducationLevel,
            body.degreeMajor,
            body.graduationYear,
            gpaNumber,
            body.intendedDegree,
            body.fieldOfStudy,
            body.targetIntakeYear,
            body.preferredCountries,
            body.budgetRangePerYear,
            body.fundingPlan,
            body.ieltsStatus,
            body.greStatus,
            body.sopStatus,
        ]);
        // update stage state: onboarding complete + strengths
        await db_1.pool.query(`
      UPDATE user_stage_state
      SET
        onboarding_complete = true,
        current_stage = 'DISCOVERING_UNIVERSITIES',
        profile_strength_academics = $1,
        profile_strength_exams = $2,
        sop_status = $3,
        updated_at = now()
      WHERE user_id = $4
      `, [academicStrength, examStrength, body.sopStatus || "NOT_STARTED", userId]);
        res.json({ message: "Onboarding completed" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Onboarding failed" });
    }
};
exports.completeOnboarding = completeOnboarding;
//# sourceMappingURL=profile.controller.js.map