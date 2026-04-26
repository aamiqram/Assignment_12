import mongoose, { Schema, models, model } from 'mongoose';

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['baby', 'elderly', 'sick'], required: true },
  features: [{ type: String }],
}, { timestamps: true });

export const Service = models.Service || model('Service', ServiceSchema);