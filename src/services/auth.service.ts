import { Response } from 'express';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken'

const otpStore = new Map<string, { code: string, expiresAt: number }>();
const refreshTokensStore = new Map<string, string>();

export class AuthService {
    private static JWT_SECRET = process.env.JWT_SECRET!;
    private static REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret_key';

    static async sendOtp(phone: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(phone, { code, expiresAt: Date.now() + 120000 });
        console.log(`OTP for ${phone}: ${code}`);
        return true;
    }

    static async verifyOtp(phone: string, code: string, res: Response) {
        const otp = otpStore.get(phone);
        if (!otp || otp.code !== code || Date.now() > otp.expiresAt) return null;
        otpStore.delete(phone);
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone });
        }

        const accessToken = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);

        // ذخیره Refresh Token (به صورت ساده در حافظه)
        refreshTokensStore.set(user._id.toString(), refreshToken);

        // ذخیره در کوکی
        this.setTokensAsCookies(res, accessToken, refreshToken);

        return { id: user._id, phone: user.phone, role: user.role };
    }
    

    static generateToken(user: any) {
        return jwt.sign(
            { id: user._id, phone: user.phone, role: user.role },
            this.JWT_SECRET,
            { expiresIn: '15m' } // توکن کوتاه‌مدت
        );
    }

    static generateRefreshToken(user: any) {
        return jwt.sign(
            { id: user._id },
            this.REFRESH_SECRET,
            { expiresIn: '7d' } // توکن بلندمدت
        );
    }

    static verifyToken(token: string) {
        return jwt.verify(token, this.JWT_SECRET);
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, this.REFRESH_SECRET);
    }

    static setTokensAsCookies(res: Response, accessToken: string, refreshToken: string) {
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 دقیقه
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 روز
        });
    }

    static async refreshAccessToken(refreshToken: string, res: Response) {
        try {
            const decoded: any = this.verifyRefreshToken(refreshToken);
            const storedToken = refreshTokensStore.get(decoded.id);
            if (storedToken !== refreshToken) {
                throw new Error('توکن معتبر نیست.');
            }
            const user = await User.findById(decoded.id);
            if (!user) throw new Error('کاربر یافت نشد.');

            const newAccessToken = this.generateToken(user);
            const newRefreshToken = this.generateRefreshToken(user);

            refreshTokensStore.set(user._id.toString(), newRefreshToken);

            this.setTokensAsCookies(res, newAccessToken, newRefreshToken);

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: 'توکن نامعتبر یا منقضی شده است.' };
        }
    }
}
