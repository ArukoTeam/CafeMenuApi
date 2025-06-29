import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import jwt from 'jsonwebtoken';

export class AuthController {
    static async sendOtp(req: Request, res: Response) {
        console.log(req.body);
        
        await AuthService.sendOtp(req.body.phone);
        res.status(200).json({ message: 'OTP sent' });
    }

    static async verifyOtp(req: Request, res: Response) {
        try {
          const { phone, code } = req.body;
    
          if (!phone || !code) {
            return res.status(400).json({ message: 'Phone and code are required' });
          }
    
          const user = await AuthService.verifyOtp(phone, code , res);
    
          if (!user) {
            return res.status(401).json({ message: 'Invalid or expired OTP' });
          }
    
          const JWT_SECRET = process.env.JWT_SECRET;
          if (!JWT_SECRET) {
            throw new Error('JWT_SECRET not defined in environment variables');
          }
    
          const token = jwt.sign(
            { id: user.id, phone: user.phone, role: user.role },
            JWT_SECRET,
            { expiresIn: '2h' }
          );
    
          return res.status(200).json({ token, role: user.role });
        } catch (err) {
          console.error('Error in verifyOtp:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
}
