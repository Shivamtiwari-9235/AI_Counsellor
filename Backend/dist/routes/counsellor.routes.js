"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const counsellor_controller_1 = require("../controllers/counsellor.controller");
const router = (0, express_1.Router)();
router.post("/counsellor", auth_middleware_1.authMiddleware, counsellor_controller_1.counsellorChat);
exports.default = router;
//# sourceMappingURL=counsellor.routes.js.map