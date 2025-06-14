import { Schema, model, Document } from 'mongoose';

export interface IBusinessInfo extends Document {
    name: string;
    logoUrl?: string;
    phone: string;
    address: string;
    description?: string;
    instagram?: string;
    whatsapp?: string;
}

const businessInfoSchema = new Schema<IBusinessInfo>({
    name: { type: String, required: true },
    logoUrl: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    instagram: { type: String },
    whatsapp: { type: String },
}, { timestamps: true });

export const BusinessInfo = model<IBusinessInfo>('BusinessInfo', businessInfoSchema);
