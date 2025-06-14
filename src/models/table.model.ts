import { Schema, model, Document } from 'mongoose';

export interface ITable extends Document {
    number: number;
    capacity: number;
    location: string; // مثلا سالن، تراس و ...
    isAvailable: boolean;
}
const tableSchema = new Schema<ITable>({
    number: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const Table = model<ITable>('Table', tableSchema);

import { Schema, model, Document, Types } from 'mongoose';

export interface IReservation extends Document {
    user: Types.ObjectId;
    table: Types.ObjectId;
    date: Date;
    timeSlot: string; // مثلا "19:00-21:00"
    guests: number;
    note?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

const reservationSchema = new Schema<IReservation>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    table: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    guests: { type: Number, required: true },
    note: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export const Reservation = model<IReservation>('Reservation', reservationSchema);
