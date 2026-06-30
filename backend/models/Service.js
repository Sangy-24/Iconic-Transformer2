import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  isSubscription: { type: Boolean, default: false },
  subscriptionPeriod: { type: String, enum: ['monthly', 'yearly', 'none'], default: 'none' },
  isActive: { type: Boolean, default: true },
  unit: { type: String },
  label: { type: String },
  labelClass: { type: String },
  priceLabel: { type: String },
  action: { type: String },
  primary: { type: Boolean, default: false },
  currency: { type: String, default: 'Rs' }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
