import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
import { pool } from "../config/db";

export const listTasks = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at ASC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const updateTaskStatus = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const taskId = req.params.id;
    const { status } = req.body;

    await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 AND user_id=$3",
      [status, taskId, userId]
    );

    res.json({ message: "Task updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};
