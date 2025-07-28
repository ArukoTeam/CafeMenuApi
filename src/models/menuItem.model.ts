import { Schema, model, Document, Types } from 'mongoose';
import { ICategory } from './category.model';

interface IImage {
    url: string;
    isCover: boolean;
  }

export interface IMenuItemOption {
    name: string;
    additionalPrice: number;
}

export interface IMenuItem extends Document {
    name: string;
    price: number;
    category: Types.ObjectId | ICategory;
    sub_category: Types.ObjectId | ICategory;
    ingredients: string[];
    stock?: number;
    isInfinite?: boolean;
    options: IMenuItemOption[];
    images: IImage[];    
    createdAt: Date;
    updatedAt: Date;
}

const menuItemOptionSchema = new Schema<IMenuItemOption>(
    {
        name: { type: String, required: true },
        additionalPrice: { type: Number, default: 0 },
    },
    { _id: false } // چون زیرمجموعه است نیازی به _id نیست
);

const imageSchema = new Schema(
    {
      url: { type: String, required: true },
      isCover: { type: Boolean, default: false },
    },
    { _id: false }
  );
  

const menuItemSchema = new Schema<IMenuItem>(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
        sub_category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
        ingredients: { type: [String], default: [] },
        stock: { type: Number, default: 0, min: 0 },
        isInfinite: { type: Boolean, default: false },
        options: { type: [menuItemOptionSchema], default: [] },
        images: { type: [imageSchema], default: [] },
    },
    { timestamps: true }
);

export const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);
