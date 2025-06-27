import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRole } from '../enums/role.enum';
import { requireRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', requireRole(UserRole.ADMIN), UserController.create);
router.put('/:id', requireRole(UserRole.ADMIN), UserController.update);
router.delete('/:id', requireRole(UserRole.ADMIN), UserController.delete);
router.get('/', requireRole(UserRole.ADMIN), UserController.getAll);

export default router;
