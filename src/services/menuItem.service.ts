import { MenuItem } from '../models/menuItem.model';

export class MenuItemService {
    static async create(data: any) {
        return MenuItem.create(data);
    }

    static async findAll() {
        return MenuItem.find();
    }

    static async findById(id: string) {
        return MenuItem.findById(id);
    }

    static async update(id: string, data: any) {
        return MenuItem.findByIdAndUpdate(id, data, { new: true });
    }

    static async delete(id: string) {
        return MenuItem.findByIdAndDelete(id);
    }
}
