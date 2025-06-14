import { NextFunction, Request, Response } from 'express';
import { BusinessInfoService } from '../services/businessInfo.service';
import { makeResponse } from '../../utils/response';

export class BusinessInfoController {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const info = await BusinessInfoService.getInfo();
            res.status(200).json(makeResponse(info, 'اطلاعات کسب‌وکار با موفقیت دریافت شد', 200));
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const info = await BusinessInfoService.updateInfo(req.body);
            res.status(200).json(makeResponse(info, 'اطلاعات کسب‌وکار با موفقیت ویرایش شد', 200));
        } catch (error) {
            next(error);
        }
    }

    static async uploadLogo(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                res.status(400).json(makeResponse(null, 'فایلی آپلود نشد!', 400));
                return;
            }
            const logoPath = `/uploads/logos/${req.file.filename}`;
            const info = await BusinessInfoService.uploadLogo(logoPath);
            res.status(200).json(makeResponse({ logoUrl: logoPath }, 'لوگو با موفقیت آپلود شد', 200));
        } catch (error) {
            next(error);
        }
    }
}
