import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
    static async create(req: Request, res: Response) {
        const cat = await CategoryService.create(req.body);
        res.status(201).json(cat);
    }
    static async getAll(req: Request, res: Response) {
        const cats = await CategoryService.findAll();
        res.json(cats);
    }
    static async getOne(req: Request, res: Response) {
        const cat = await CategoryService.findById(req.params.id);
        if (!cat) return res.status(404).send('Not found');
        res.json(cat);
    }
    static async update(req: Request, res: Response) {
        const cat = await CategoryService.update(req.params.id, req.body);
        res.json(cat);
    }
    static async delete(req: Request, res: Response) {
        await CategoryService.delete(req.params.id);
        res.status(204).send();
    }
}
