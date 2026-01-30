"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const db_1 = require("../config/db");
const getDashboard = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profile = await db_1.pool.query("SELECT * FROM user_profile WHERE user_id=$1", [userId]);
        const stage = await db_1.pool.query("SELECT * FROM user_stage_state WHERE user_id=$1", [userId]);
        const tasks = await db_1.pool.query("SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at ASC LIMIT 10", [userId]);
        res.json({
            profile: profile.rows[0] || null,
            stage: stage.rows[0] || null,
            tasks: tasks.rows,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load dashboard" });
    }
};
exports.getDashboard = getDashboard;
//# sourceMappingURL=dashboard.controller.js.map