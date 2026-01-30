import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
import { pool } from "../config/db";

export const getDashboard = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const profile = await pool.query(
      "SELECT * FROM user_profile WHERE user_id=$1",
      [userId]
    );
    const stage = await pool.query(
      "SELECT * FROM user_stage_state WHERE user_id=$1",
      [userId]
    );
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at ASC LIMIT 10",
      [userId]
    );

    res.json({
      profile: profile.rows[0] || null,
      stage: stage.rows[0] || null,
      tasks: tasks.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};
