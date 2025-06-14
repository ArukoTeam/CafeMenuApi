import { v4 as uuidv4 } from 'uuid';

const otpStore = new Map<string, { code: string, expiresAt: number }>();

export class AuthService {
    static async sendOtp(phone: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(phone, { code, expiresAt: Date.now() + 120000 }); // 2 دقیقه اعتبار
        console.log(`OTP for ${phone}: ${code}`);
        return true;
    }

    static async verifyOtp(phone: string, code: string) {
        const otp = otpStore.get(phone);
        if (!otp || otp.code !== code || Date.now() > otp.expiresAt) return null;
        otpStore.delete(phone);
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone }); // role پیش‌فرض customer
        }
        return { id: user._id, phone: user.phone, role: user.role };
    }
    static async findOrCreateUser(phone: string) {
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone });
        }
        return user;
    }

    static generateToken(user: any) {
        return jwt.sign({ id: user._id, phone: user.phone, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    }

    static verifyToken(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}
