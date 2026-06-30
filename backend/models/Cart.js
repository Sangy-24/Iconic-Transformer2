import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

// Prevent duplicate service entries for the same user
cartSchema.index({ userId: 1, serviceId: 1 }, { unique: true });

export default mongoose.model('Cart', cartSchema);
