import { IUser } from "../../models/user.model";

declare global {
    namespace Express {
      interface Request {
        user?: Omit<IUser, 'password'>;
        file?: Express.Multer.File;
        files?: Express.Multer.File[];
      }
    }
  }
// 👇 این خط بسیار مهم است
export {};
