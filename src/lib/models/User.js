import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nid: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: false },
  image: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);