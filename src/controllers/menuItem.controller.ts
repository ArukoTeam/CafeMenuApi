import { Request, Response } from 'express';
import { MenuItemService } from '../services/menuItem.service';

export class MenuItemController {
    static async create(req: Request, res: Response) {
        const response = await MenuItemService.create(req.body);
        res.status(response.statusCode).json(response);
    }

    static async getAll(req: Request, res: Response) {
        const response = await MenuItemService.findAll(req.query);
        res.status(response.statusCode).json(response);
    }

    static async getOne(req: Request, res: Response) {
        const response = await MenuItemService.findById(req.params.id);
        res.status(response.statusCode).json(response);
    }

    static async update(req: Request, res: Response) {
        const response = await MenuItemService.update(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }

    static async delete(req: Request, res: Response) {
        const response = await MenuItemService.delete(req.params.id);
        res.status(response.statusCode).json(response);
    }
}
