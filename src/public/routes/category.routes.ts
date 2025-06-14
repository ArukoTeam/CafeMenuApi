import express from 'express';
import { CategoryController } from '../../controllers/category.controller';
import validate from '../../middlewares/validate.middleware';
import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('')
});

const router = express.Router();
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);

export default router;
