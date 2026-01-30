"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const universities_controller_1 = require("../controllers/universities.controller");
const router = (0, express_1.Router)();
router.get("/recommend", auth_middleware_1.authMiddleware, universities_controller_1.getRecommendations);
router.post("/shortlist", auth_middleware_1.authMiddleware, universities_controller_1.shortlistUniversity);
router.post("/lock", auth_middleware_1.authMiddleware, universities_controller_1.lockUniversity);
exports.default = router;
//# sourceMappingURL=universities.routes.js.map