import { Category } from '../models/category.model';
import { makeResponse } from '../utils/response';

export class CategoryService {
    static async create(data: any) {
        const category = await Category.create(data);
        return makeResponse(category, 'دسته‌بندی با موفقیت ایجاد شد', 201);
    }

    static async findAll() {
        const categories = await Category.find().populate('parent', 'name _id');
        return makeResponse(categories, 'لیست دسته‌بندی‌ها', 200);
    }

    static async findById(id: string) {
        const category = await Category.findById(id).populate('parent', 'name _id');
        if (!category) return makeResponse(null, 'دسته‌بندی یافت نشد', 404);
        return makeResponse(category, 'دسته‌بندی یافت شد', 200);
    }

    static async update(id: string, data: any) {
        const category = await Category.findByIdAndUpdate(id, data, { new: true }).populate('parent', 'name _id');
        if (!category) return makeResponse(null, 'دسته‌بندی برای بروزرسانی یافت نشد', 404);
        return makeResponse(category, 'دسته‌بندی بروزرسانی شد', 200);
    }

    static async delete(id: string) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) return makeResponse(null, 'دسته‌بندی برای حذف یافت نشد', 404);
        return makeResponse(null, 'دسته‌بندی حذف شد', 204);
    }
}
