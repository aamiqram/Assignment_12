import mongoose, { Schema, models, model } from 'mongoose';

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  duration: { type: Number, required: true },
  durationType: { type: String, enum: ['hours', 'days'], required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export const Booking = models.Booking || model('Booking', BookingSchema);