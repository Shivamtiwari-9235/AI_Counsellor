import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { listTasks, updateTaskStatus } from "../controllers/tasks.controller";

const router = Router();

router.get("/", authMiddleware, listTasks);
router.patch("/:id", authMiddleware, updateTaskStatus);

export default router;
