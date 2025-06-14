import { Request, Response } from 'express';
import { MenuItemService } from '../services/menuItem.service';

export class MenuItemController {
    static async create(req: Request, res: Response) {
        const item = await MenuItemService.create(req.body);
        res.status(201).json(item);
    }

    static async getAll(req: Request, res: Response) {
        const items = await MenuItemService.findAll();
        res.json(items);
    }

    static async getOne(req: Request, res: Response) {
        const item = await MenuItemService.findById(req.params.id);
        if (!item) return res.status(404).send('Not found');
        res.json(item);
    }

    static async update(req: Request, res: Response) {
        const item = await MenuItemService.update(req.params.id, req.body);
        res.json(item);
    }

    static async delete(req: Request, res: Response) {
        await MenuItemService.delete(req.params.id);
        res.status(204).send();
    }
}
