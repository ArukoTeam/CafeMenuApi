import Joi from 'joi';

export const createCategorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(''),
});

export const updateCategorySchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional().allow(''),
});
