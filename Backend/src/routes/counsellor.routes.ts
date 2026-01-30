import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { counsellorChat } from "../controllers/counsellor.controller";

const router = Router();

router.post("/counsellor", authMiddleware, counsellorChat);

export default router;
