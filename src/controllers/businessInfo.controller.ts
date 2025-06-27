import { Request, Response } from 'express';
import { BusinessInfoService } from '../services/businessInfo.service';

export class BusinessInfoController {
    static async get(req: Request, res: Response) {
        const response = await BusinessInfoService.getInfo();
        res.status(response.statusCode).json(response);
    }

    static async update(req: Request, res: Response) {
        const response = await BusinessInfoService.updateInfo(req.body);
        res.status(response.statusCode).json(response);
    }

    static async uploadLogo(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).json({
                data: null,
                message: 'فایلی آپلود نشد!',
                statusCode: 400,
            });
            return;
        }

        const logoPath = `/uploads/logos/${req.file.filename}`;
        const response = await BusinessInfoService.uploadLogo(logoPath);
        res.status(response.statusCode).json(response);
    }
}
