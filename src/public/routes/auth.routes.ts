import express from 'express';
import { AuthController } from '../../controllers/auth.controller';


const authRouter = express.Router();

authRouter.post('/send-otp', async (req, res) => await AuthController.sendOtp(req, res));
authRouter.post('/verify-otp', async (req, res) => {
    await AuthController.verifyOtp(req, res);
});

export default authRouter;
