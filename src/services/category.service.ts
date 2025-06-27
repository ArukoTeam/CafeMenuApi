import { Category } from '../models/category.model';
import { makeResponse } from '../utils/response';

export class CategoryService {
    static async create(data: any) {
        const cat = await Category.create(data);
        return makeResponse(cat, 'دسته‌بندی با موفقیت ایجاد شد', 201);
    }

    static async findAll() {
        const categories = await Category.find();
        return makeResponse(categories, 'لیست دسته‌بندی‌ها', 200);
    }

    static async findById(id: string) {
        const cat = await Category.findById(id);
        if (!cat) return makeResponse(null, 'دسته‌بندی یافت نشد', 404);
        return makeResponse(cat, 'دسته‌بندی یافت شد', 200);
    }

    static async update(id: string, data: any) {
        const cat = await Category.findByIdAndUpdate(id, data, { new: true });
        if (!cat) return makeResponse(null, 'دسته‌بندی برای بروزرسانی یافت نشد', 404);
        return makeResponse(cat, 'دسته‌بندی بروزرسانی شد', 200);
    }

    static async delete(id: string) {
        const cat = await Category.findByIdAndDelete(id);
        if (!cat) return makeResponse(null, 'دسته‌بندی برای حذف یافت نشد', 404);
        return makeResponse(null, 'دسته‌بندی حذف شد', 204);
    }
}
