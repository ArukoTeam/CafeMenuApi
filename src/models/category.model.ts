import { Schema, model, Document, Types } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description?: string;
    parent?: Types.ObjectId | ICategory;
}

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true },
        parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    },
    { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);
