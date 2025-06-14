import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
    menuItem: Types.ObjectId;
    user: Types.ObjectId;
    text: string;
    imageUrl?: string;
    createdAt: Date;
}

const commentSchema = new Schema<IComment>({
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    imageUrl: { type: String }
}, { timestamps: true });

export const Comment = model<IComment>('Comment', commentSchema);
