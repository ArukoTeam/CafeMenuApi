import { Schema, model, Document } from 'mongoose';

export interface IDiscount extends Document {
    code: string;
    discount: number; // درصد یا مقدار
    isActive: boolean;
    expiresAt: Date;
}
const discountSchema = new Schema<IDiscount>({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

export const Discount = model<IDiscount>('Discount', discountSchema);