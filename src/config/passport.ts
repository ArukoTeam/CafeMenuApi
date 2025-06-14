import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';
import { AuthService } from '../services/auth.service';

passport.use('otp', new CustomStrategy(async (req, done) => {
    const { phone, code } = req.body;
    const user = await AuthService.verifyOtp(phone, code);
    if (!user) return done(null, false);
    return done(null, user);
}));

export default passport;
