import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    static async create(req: Request, res: Response) {
        const result = await UserService.createUser(req.body);
        res.status(result.statusCode).json(result);
    }

    static async update(req: Request, res: Response) {
        const result = await UserService.updateUser(req.params.id, req.body);
        res.status(result.statusCode).json(result);
    }

    static async delete(req: Request, res: Response) {
        const result = await UserService.deleteUser(req.params.id);
        res.status(result.statusCode).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const result = await UserService.getAllUsers();
        res.status(result.statusCode).json(result);
    }
}
