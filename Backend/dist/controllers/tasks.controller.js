"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.listTasks = void 0;
const db_1 = require("../config/db");
const listTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await db_1.pool.query("SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at ASC", [userId]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};
exports.listTasks = listTasks;
const updateTaskStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const taskId = req.params.id;
        const { status } = req.body;
        await db_1.pool.query("UPDATE tasks SET status=$1 WHERE id=$2 AND user_id=$3", [status, taskId, userId]);
        res.json({ message: "Task updated" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update task" });
    }
};
exports.updateTaskStatus = updateTaskStatus;
//# sourceMappingURL=tasks.controller.js.map