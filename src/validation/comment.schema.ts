import Joi from 'joi';
import mongoose from 'mongoose';

export const createCommentSchema = Joi.object({
    menuItem: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    user: Joi.string().required(), // بعداً از JWT استخراج می‌کنی
    text: Joi.string().required(),
});
