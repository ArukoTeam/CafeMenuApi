import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

export class CommentController {
    static async create(req: Request, res: Response) {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const comment = await CommentService.create({
            ...req.body,
            imageUrl
        });
        res.status(201).json(comment);
    }
}
