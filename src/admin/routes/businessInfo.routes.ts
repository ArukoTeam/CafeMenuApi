import express from 'express';
import { BusinessInfoController } from '../controllers/businessInfo.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { uploadLogo } from '../../middlewares/uploadLogo.middleware';
import validate from '../../middlewares/validate.middleware';
import { businessInfoSchema } from '../validations/businessInfo.schema';

const router = express.Router();

router.get('/', BusinessInfoController.get);

router.put(
    '/',
    requireAuth,
    requireRole('admin'),
    validate(businessInfoSchema),
    BusinessInfoController.update
);

// آپلود لوگو
router.post(
    '/logo',
    requireAuth,
    requireRole('admin'),
    uploadLogo.single('logo'),
    BusinessInfoController.uploadLogo
);

export default router;
