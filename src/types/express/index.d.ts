import { IUser } from './src/models/user.model';

declare global {
    namespace Express {
        // وقتی پاسپورت یا JWT user رو به req اضافه می‌کنه:
        interface User extends Omit<IUser, 'password'> { }

        interface Request {
            user?: User;
            // اگر آپلود فایلت با multer هست:
            file?: Express.Multer.File;
            files?: Express.Multer.File[];
        }
    }
}
