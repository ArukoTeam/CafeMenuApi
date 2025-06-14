import { Category } from '../models/category.model';

export class CategoryService {
    static async create(data: any) {
        return Category.create(data);
    }
    static async findAll() {
        return Category.find();
    }
    static async findById(id: string) {
        return Category.findById(id);
    }
    static async update(id: string, data: any) {
        return Category.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id: string) {
        return Category.findByIdAndDelete(id);
    }
}
