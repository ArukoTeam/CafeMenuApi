import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ errors: error.details.map(e => e.message) });
            return;
        }
        next();
    };
};
