import { Schema, model, Document, Types } from 'mongoose';
import { ICartItem } from './cart.model';

export interface IOrder extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
    total: number;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    paymentMethod: 'cash' | 'card' | 'online';
    coupon?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    paymentMethod: { type: String, enum: ['cash', 'card', 'online'], required: true },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' }
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
