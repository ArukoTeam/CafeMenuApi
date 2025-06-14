import express from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/', requireAuth, requireRole('admin'), UserController.create);
router.put('/:id', requireAuth, requireRole('admin'), UserController.update);
router.delete('/:id', requireAuth, requireRole('admin'), UserController.delete);
router.get('/', requireAuth, requireRole('admin'), UserController.getAll);

export default router;
