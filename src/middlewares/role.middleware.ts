import { Request, Response, NextFunction } from 'express';

export const requireRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes((req.user as any).role)) {
            res.status(403).json({ message: 'دسترسی غیرمجاز' });
            return;
        }
        next();
    };
};