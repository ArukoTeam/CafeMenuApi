import express from 'express';
import { BusinessInfoController } from '../controllers/businessInfo.controller';
import { requireRole } from '../middlewares/auth.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import { businessInfoSchema } from '../validation/businessInfo.schema';
import { UserRole } from '../enums/role.enum';
import { uploadFile, UploadType } from '../middlewares/uploadFile.middleware';


const router = express.Router();

router.get('/', BusinessInfoController.get);

router.put(
    '/',
    requireRole(UserRole.ADMIN),
    validateMiddleware(businessInfoSchema),
    BusinessInfoController.update
);

router.post(
    '/logo',
    requireRole(UserRole.ADMIN),
    uploadFile(UploadType.LOGO),
    BusinessInfoController.uploadLogo
);

export default router;
