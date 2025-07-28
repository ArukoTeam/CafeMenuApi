
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
