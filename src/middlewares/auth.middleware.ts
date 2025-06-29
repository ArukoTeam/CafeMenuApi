import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../enums/role.enum';
import { makeResponse } from '../utils/response';

export const requireRole = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            res
                .status(403)
                .json(makeResponse(null, 'دسترسی غیرمجاز می‌باشد.', 403));
            return;
        }

        next();
    };
};
