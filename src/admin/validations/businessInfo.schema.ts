import Joi from 'joi';

export const businessInfoSchema = Joi.object({
    name: Joi.string().required(),
    logoUrl: Joi.string().uri().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().optional(),
    instagram: Joi.string().optional(),
    whatsapp: Joi.string().optional(),
});
