import Joi from 'joi';

const optionSchema = Joi.object({
  name: Joi.string().required(),
  additionalPrice: Joi.number().min(0).default(0),
});

const imageSchema = Joi.object({
  url: Joi.string().uri().required(), 
  isCover: Joi.boolean().default(false),
});

export const createMenuItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  sub_category: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).default([]),
  stock: Joi.number().min(0),
  isInfinite: Joi.boolean().default(false),
  options: Joi.array().items(optionSchema).default([]),
  images: Joi.array().items(imageSchema).default([]),
});
