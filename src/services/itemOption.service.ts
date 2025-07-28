import { MenuItem } from "../models/menuItem.model";
import { makeResponse } from "../utils/response";

export class ItemOptionService {
    static async addOptionToMenuItem(menuItemId: string, option: { name: string; additionalPrice?: number}) {
        const item = await MenuItem.findById(menuItemId);
        if (!item) return makeResponse(null, 'آیتم منو یافت نشد', 404);
    
        const newOption = {
            name: option.name,
            additionalPrice: option.additionalPrice || 0,
        };
    
        item.options.push(newOption);
        await item.save();
    
        return makeResponse(item, 'آپشن جدید با موفقیت به آیتم منو افزوده شد', 200);
    }

    static async updateMenuItemOption(
        menuItemId: string,
        optionName: string,
        updatedOption: { name?: string; additionalPrice?: number}
    ) {
        const item = await MenuItem.findById(menuItemId);
        if (!item) return makeResponse(null, 'آیتم منو یافت نشد', 404);
    
        const option = item.options.find(opt => opt.name === optionName);
        if (!option) return makeResponse(null, 'آپشن مورد نظر یافت نشد', 404);
    
        if (updatedOption.name !== undefined) option.name = updatedOption.name;
        if (updatedOption.additionalPrice !== undefined) option.additionalPrice = updatedOption.additionalPrice;
    
        await item.save();
    
        return makeResponse(item, 'آپشن با موفقیت ویرایش شد', 200);
    }

    static async deleteMenuItemOption(menuItemId: string, optionName: string) {
        const item = await MenuItem.findById(menuItemId);
        if (!item) return makeResponse(null, 'آیتم منو یافت نشد', 404);
    
        const initialLength = item.options.length;
        item.options = item.options.filter(opt => opt.name !== optionName);
    
        if (item.options.length === initialLength) {
            return makeResponse(null, 'آپشنی با این نام یافت نشد', 404);
        }
    
        await item.save();
    
        return makeResponse(item, 'آپشن با موفقیت حذف شد', 200);
    }
    
    
    
}