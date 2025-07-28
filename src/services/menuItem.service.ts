import { MenuItem } from '../models/menuItem.model';
import { makeResponse } from '../utils/response';

export class MenuItemService {
    static async create(data: any) {
        // اطمینان از اینکه images یک آرایه است
        if (!Array.isArray(data.images)) {
            data.images = [];
        }
    
        // اگر چند عکس با isCover=true وجود دارد، فقط یکی را نگه می‌داریم
        let coverSet = false;
        data.images = data.images.map((img: any, index: number) => {
            if (img.isCover && !coverSet) {
                coverSet = true;
                return { ...img, isCover: true };
            }
            return { ...img, isCover: false };
        });
    
        // اگر هیچ کاوری مشخص نشده بود، اولین عکس را به عنوان کاور تنظیم می‌کنیم
        if (!coverSet && data.images.length > 0) {
            data.images[0].isCover = true;
        }
    
        // ساخت آیتم
        const item = await MenuItem.create(data);
        return makeResponse(item, 'آیتم منو با موفقیت ایجاد شد', 201);
    }
    

    static async findAll(query: {
        page?: number;
        limit?: number;
        category?: string;
        isAvailable?: string;
    }) {
        const { page = 1, limit = 10, category, isAvailable } = query;

        const filters: any = {};
        if (category) filters.category = category;
        if (isAvailable !== undefined) filters.isAvailable = isAvailable === 'true';

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            MenuItem.find(filters).skip(skip).limit(Number(limit)),
            MenuItem.countDocuments(filters),
        ]);

        return makeResponse(
            {
                items,
                total,
                page: Number(page),
                pageSize: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
            'لیست آیتم‌های منو',
            200
        );
    }    

    static async findById(id: string) {
        const item = await MenuItem.findById(id);
        if (!item) return makeResponse(null, 'آیتم منو یافت نشد', 404);
        return makeResponse(item, 'آیتم منو یافت شد', 200);
    }

    static async update(id: string, data: any) {
        const item = await MenuItem.findById(id);
        if (!item) return makeResponse(null, 'آیتم منو برای بروزرسانی یافت نشد', 404);
    
        // اگر تصاویر در درخواست ارسال شده باشد
        if (Array.isArray(data.images)) {
            let coverSet = false;
    
            data.images = data.images.map((img: any, index: number) => {
                if (img.isCover && !coverSet) {
                    coverSet = true;
                    return { ...img, isCover: true };
                }
                return { ...img, isCover: false };
            });
    
            // اگر هیچ کاور مشخص نشده بود، اولین عکس را به عنوان کاور تنظیم کنیم
            if (!coverSet && data.images.length > 0) {
                data.images[0].isCover = true;
            }
        }
    
        // اعمال سایر تغییرات
        Object.assign(item, data);
        await item.save();
    
        return makeResponse(item, 'آیتم منو با موفقیت بروزرسانی شد', 200);
    }
    

    static async delete(id: string) {
        const item = await MenuItem.findByIdAndDelete(id);
        if (!item) return makeResponse(null, 'آیتم منو برای حذف یافت نشد', 404);
        return makeResponse(null, 'آیتم منو حذف شد', 204);
    }
}


// {
//     "name": "لاته",
//     "price": 85000,
//     "images": [
//       { "url": "uploads/images/latte1.jpg", "isCover": true },
//       { "url": "uploads/images/latte2.jpg", "isCover": false }
//     ]
//   }
  
