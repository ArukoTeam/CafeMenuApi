import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import jwt from 'jsonwebtoken';

export class AuthController {
    static async sendOtp(req: Request, res: Response) {
        await AuthService.sendOtp(req.body.phone);
        res.status(200).json({ message: 'OTP sent' });
    }

    static async verifyOtp(req: Request, res: Response) {
        const user = await AuthService.verifyOtp(req.body.phone, req.body.code);
        if (!user) return res.status(401).send('Invalid OTP');

        const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
        res.json({ token, role: user.role });
    }
}
