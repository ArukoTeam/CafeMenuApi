import { Comment } from '../models/comment.model';

export class CommentService {
    static async create(data: any) {
        return Comment.create(data);
    }

    static async getByMenuItem(menuItemId: string) {
        return Comment.find({ menuItem: menuItemId }).populate('user');
    }
}
