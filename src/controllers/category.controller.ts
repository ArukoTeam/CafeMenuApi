import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
    static async create(req: Request, res: Response) {
        const response = await CategoryService.create(req.body);
        res.status(response.statusCode).json(response);
    }

    static async getAll(req: Request, res: Response) {
        const response = await CategoryService.findAll();
        res.status(response.statusCode).json(response);
    }

    static async getOne(req: Request, res: Response) {
        const response = await CategoryService.findById(req.params.id);
        res.status(response.statusCode).json(response);
    }

    static async update(req: Request, res: Response) {
        const response = await CategoryService.update(req.params.id, req.body);
        res.status(response.statusCode).json(response);
    }

    static async delete(req: Request, res: Response) {
        const response = await CategoryService.delete(req.params.id);
        res.status(response.statusCode).json(response);
    }
}
