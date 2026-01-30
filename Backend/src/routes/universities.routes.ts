import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getRecommendations,
  shortlistUniversity,
  lockUniversity,
} from "../controllers/universities.controller";

const router = Router();

router.get("/recommend", authMiddleware, getRecommendations);
router.post("/shortlist", authMiddleware, shortlistUniversity);
router.post("/lock", authMiddleware, lockUniversity);

export default router;
