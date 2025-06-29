import { User } from '../models/user.model';
import { makeResponse } from '../utils/response';

export class UserService {
    static async createUser(data: { phone: string; name?: string; role: string }) {
        const user = await User.create(data);
        return makeResponse(user, 'کاربر با موفقیت ایجاد شد', 201);
    }

    static async updateUser(id: string, data: any) {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        return makeResponse(user, 'کاربر با موفقیت به‌روزرسانی شد', 200);
    }

    static async deleteUser(id: string) {
        await User.findByIdAndDelete(id);
        return makeResponse(null, 'کاربر حذف شد', 204);
    }

    static async getAllUsers() {
        const users = await User.find();
        return makeResponse(users, 'لیست کاربران', 200);
    }
}
