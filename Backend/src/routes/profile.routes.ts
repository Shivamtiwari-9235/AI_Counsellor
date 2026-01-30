import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { completeOnboarding, getProfile } from "../controllers/profile.controller";

const router = Router();

router.get("/", authMiddleware, getProfile);
router.post("/onboarding", authMiddleware, completeOnboarding);

export default router;
