import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import validate from '../middlewares/validate.middleware';
import { UserRole } from '../enums/role.enum';
import { createCategorySchema, updateCategorySchema } from '../validation/category.schema';
import { requireRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
    '/',
    requireRole(UserRole.ADMIN),
    validate(createCategorySchema),
    CategoryController.create
);

router.put(
    '/:id',
    requireRole(UserRole.ADMIN),
    validate(updateCategorySchema),
    CategoryController.update
);

router.delete(
    '/:id',
    requireRole(UserRole.ADMIN),
    CategoryController.delete
);

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);

export default router;
