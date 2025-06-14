import express from 'express';
import { AuthController } from '../../controllers/auth.controller';

const router = express.Router();

router.post('/send-otp', AuthController.sendOtp);
router.post('/verify-otp', AuthController.verifyOtp);

export default router;
