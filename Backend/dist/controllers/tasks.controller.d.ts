import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
export declare const listTasks: (req: AuthedRequest, res: Response) => Promise<void>;
export declare const updateTaskStatus: (req: AuthedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=tasks.controller.d.ts.map