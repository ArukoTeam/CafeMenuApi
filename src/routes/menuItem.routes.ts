import express from 'express';
import { MenuItemController } from '../controllers/menuItem.controller';
import validate from '../middlewares/validate.middleware';
import { uploadFile, UploadType } from '../middlewares/uploadFile.middleware';
import { UserRole } from '../enums/role.enum';
import { createMenuItemSchema } from '../validation/menuItem.schema';
import { requireRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
    '/',
    requireRole(UserRole.ADMIN),
    validate(createMenuItemSchema),
    uploadFile(UploadType.MENU_ITEM),
    MenuItemController.create
);

router.put(
    '/:id',
    requireRole(UserRole.ADMIN, UserRole.WAITER),
    validate(createMenuItemSchema),
    uploadFile(UploadType.MENU_ITEM),
    MenuItemController.update
);

router.get('/', MenuItemController.getAll);
router.get('/:id', MenuItemController.getOne);
router.delete('/:id', requireRole(UserRole.ADMIN), MenuItemController.delete);

export default router;
