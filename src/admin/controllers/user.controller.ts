import { Request, Response } from 'express';
import { User } from '../../models/user.model';

export class UserController {
    static async create(req: Request, res: Response) {
        const { phone, name, role } = req.body;
        const user = await User.create({ phone, name, role });
        res.status(201).json(user);
    }
    static async update(req: Request, res: Response) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    }
    static async delete(req: Request, res: Response) {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    static async getAll(req: Request, res: Response) {
        const users = await User.find({});
        res.json(users);
    }
}
