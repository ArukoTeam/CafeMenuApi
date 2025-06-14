import { Schema, model, Document, Types } from 'mongoose';

export interface ICartItem {
    menuItem: Types.ObjectId;
    quantity: number;
    note?: string;
}
export interface ICart extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}
const cartItemSchema = new Schema<ICartItem>({
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, min: 1 },
    note: { type: String }
});
const cartSchema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema]
}, { timestamps: true });

export const Cart = model<ICart>('Cart', cartSchema);