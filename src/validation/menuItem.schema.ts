import Joi from 'joi';

export const createMenuItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()),
    isAvailable: Joi.boolean()
});
