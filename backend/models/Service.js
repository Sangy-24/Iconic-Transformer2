import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Maintenance', 'Testing', 'Installation', 'Monitoring'], required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  isSubscription: { type: Boolean, default: false },
  subscriptionPeriod: { type: String, enum: ['monthly', 'yearly', 'none'], default: 'none' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
