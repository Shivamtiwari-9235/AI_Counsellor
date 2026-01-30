"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, tasks_controller_1.listTasks);
router.patch("/:id", auth_middleware_1.authMiddleware, tasks_controller_1.updateTaskStatus);
exports.default = router;
//# sourceMappingURL=tasks.routes.js.map