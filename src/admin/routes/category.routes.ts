import express from 'express';
import { CategoryController } from '../../controllers/category.controller';
import validate from '../../middlewares/validate.middleware';
import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('')
});

const router = express.Router();
router.post('/', validate(categorySchema), CategoryController.create);
router.put('/:id', validate(categorySchema), CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
