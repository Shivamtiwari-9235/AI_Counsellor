"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockUniversity = exports.shortlistUniversity = exports.getRecommendations = void 0;
const db_1 = require("../config/db");
const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profileRes = await db_1.pool.query("SELECT * FROM user_profile WHERE user_id=$1", [userId]);
        const profile = profileRes.rows[0];
        // basic filtering: country + degree
        const uniRes = await db_1.pool.query("SELECT * FROM universities WHERE country = ANY (string_to_array($1, ','))", [profile.preferred_countries || ""]);
        const universities = uniRes.rows.map((u) => {
            // simple logic for category + chance
            const category = "Target";
            const chance = "Medium";
            return {
                id: u.id,
                name: u.name,
                country: u.country,
                category,
                costLevel: u.base_cost_level,
                acceptanceChance: chance,
                fitReason: "Matches your degree and country preference.",
                risks: "Exam scores and GPA are approximate; confirm with official pages.",
            };
        });
        res.json(universities);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to recommend universities" });
    }
};
exports.getRecommendations = getRecommendations;
const shortlistUniversity = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { universityId, category } = req.body;
        await db_1.pool.query(`
      INSERT INTO user_university_selection (user_id, university_id, category, status)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (user_id, university_id) DO UPDATE SET
        category = EXCLUDED.category,
        status = EXCLUDED.status
      `, [userId, universityId, category || "Target", "SHORTLISTED"]);
        res.json({ message: "Shortlisted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to shortlist" });
    }
};
exports.shortlistUniversity = shortlistUniversity;
const lockUniversity = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { universityId } = req.body;
        // mark this as locked
        await db_1.pool.query(`
      UPDATE user_university_selection
      SET status='LOCKED'
      WHERE user_id=$1 AND university_id=$2
      `, [userId, universityId]);
        // update stage state: has_locked_university + stage
        await db_1.pool.query(`
      UPDATE user_stage_state
      SET has_locked_university=true,
          current_stage='FINALIZING_UNIVERSITIES',
          updated_at=now()
      WHERE user_id=$1
      `, [userId]);
        res.json({ message: "Locked university" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to lock university" });
    }
};
exports.lockUniversity = lockUniversity;
//# sourceMappingURL=universities.controller.js.map