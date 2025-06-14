import express from 'express';
import { MenuItemController } from '../../controllers/menuItem.controller';
import validate from '../../middlewares/validate.middleware';
import { createMenuItemSchema } from '../validations/menuItem.schema';

const router = express.Router();

router.get('/', MenuItemController.getAll);
router.get('/:id', MenuItemController.getOne);

export default router;
