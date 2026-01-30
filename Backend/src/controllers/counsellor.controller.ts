import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
import { pool } from "../config/db";

export const counsellorChat = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { message } = req.body as { message?: string };

    const profileRes = await pool.query(
      "SELECT * FROM user_profile WHERE user_id=$1",
      [userId]
    );
    const stageRes = await pool.query(
      "SELECT * FROM user_stage_state WHERE user_id=$1",
      [userId]
    );
    const profile = profileRes.rows[0];
    const stage = stageRes.rows[0];

    // TODO: intent detection + actions (shortlist/lock/create tasks)
    // Abhi ke liye simple static response (MVP):
    const reply = message
      ? `You said: "${message}". I have your profile and current stage. Next, we should shortlist 2–3 target universities and lock one before moving to application tasks.`
      : "I have your profile and current stage. Next, we should shortlist 2–3 target universities and lock one before moving to application tasks.";

    res.json({
      reply,
      profile,
      stage,
      actions: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI counsellor failed" });
  }
};
