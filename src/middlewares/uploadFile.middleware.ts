import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

// 1. تعریف enum
export enum UploadType {
    LOGO = 'logo',
    MENU_ITEM = 'menu-item',
    CATEGORY = 'category',
    COMMENT = 'comment'
}

// 2. مسیرها و پیشوندها را با enum نگه می‌داریم
const UPLOAD_PATHS: Record<UploadType, string> = {
    [UploadType.LOGO]: 'uploads/logos/',
    [UploadType.MENU_ITEM]: 'uploads/menu-items/',
    [UploadType.CATEGORY]: 'uploads/categories/',
    [UploadType.COMMENT]: 'uploads/comments/',
};

const FILENAME_PREFIX: Record<UploadType, string> = {
    [UploadType.LOGO]: 'logo',
    [UploadType.MENU_ITEM]: 'menuitem',
    [UploadType.CATEGORY]: 'category',
    [UploadType.COMMENT]: 'comment',
};

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export function uploadFile(
    type: UploadType,
    multiple = false,
    fileFieldName: string = multiple ? 'files' : 'file'
) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const dest = UPLOAD_PATHS[type];
            // ساخت مسیر اگر وجود نداشت
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();
            const prefix = FILENAME_PREFIX[type];
            cb(null, `${prefix}_${Date.now()}${ext}`);
        }
    });

    const fileFilter = function (
        req: Express.Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            cb(new Error('فقط فرمت jpg، jpeg، png یا webp مجاز است!'));
        } else {
            cb(null, true);
        }
    };

    const uploader = multer({ storage, fileFilter });

    // برای چند فایل یا تک فایل
    return multiple
        ? uploader.array(fileFieldName, 5)
        : uploader.single(fileFieldName);
}
