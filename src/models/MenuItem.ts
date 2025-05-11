import { Schema, model, Document } from 'mongoose';

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    ingredients: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);