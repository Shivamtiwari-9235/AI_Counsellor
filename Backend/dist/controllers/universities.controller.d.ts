import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
export declare const getRecommendations: (req: AuthedRequest, res: Response) => Promise<void>;
export declare const shortlistUniversity: (req: AuthedRequest, res: Response) => Promise<void>;
export declare const lockUniversity: (req: AuthedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=universities.controller.d.ts.map