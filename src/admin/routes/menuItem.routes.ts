import express from 'express';
import { MenuItemController } from '../../controllers/menuItem.controller';
import validate from '../../middlewares/validate.middleware';
import { createMenuItemSchema } from '../validations/menuItem.schema';
import { uploadFile, UploadType } from '../../middlewares/uploadFile.middleware';

const router = express.Router();

router.post(
    '/',
    requireAuth,
    requireRole('admin'),
    validate(createMenuItemSchema),
    uploadFile(UploadType.MENU_ITEM),
    MenuItemController.create
);

router.put(
    '/:id',
    requireAuth,
    requireRole('admin', 'waiter'),
    validate(createMenuItemSchema),
    uploadFile(UploadType.MENU_ITEM),
    MenuItemController.update
);

router.delete('/:id', MenuItemController.delete);

export default router;
