import { Schema, model, Document } from 'mongoose';

export type UserRole = 'admin' | 'waiter' | 'customer';

export interface IUser extends Document {
    phone: string;
    role: UserRole;
    name?: string;
}

const userSchema = new Schema<IUser>({
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'waiter', 'customer'], default: 'customer' },
    name: { type: String }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
