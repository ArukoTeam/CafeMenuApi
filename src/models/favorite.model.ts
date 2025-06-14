import { Schema, model, Document, Types } from 'mongoose';

export interface IFavorite extends Document {
    user: Types.ObjectId;
    menuItem: Types.ObjectId;
}

const favoriteSchema = new Schema<IFavorite>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true }
}, { timestamps: true });

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);