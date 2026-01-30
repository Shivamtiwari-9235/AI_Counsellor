import { Request, Response, NextFunction } from "express";
export interface AuthedRequest extends Request {
    user?: {
        userId: number | string;
        email: string;
    };
}
export declare const authMiddleware: (req: AuthedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map