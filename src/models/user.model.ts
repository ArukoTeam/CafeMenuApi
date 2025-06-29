import { Schema, model, Document, Types } from 'mongoose';
import { UserRole } from '../enums/role.enum';

export interface IUser extends Document {
    _id: Types.ObjectId;
    phone: string;
    role: UserRole;
    name?: string;
}

const userSchema = new Schema<IUser>(
    {
        phone: { type: String, required: true, unique: true },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
        },
        name: { type: String },
    },
    { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
