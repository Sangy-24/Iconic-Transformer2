import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
      price: { type: Number, required: true },
      qty: { type: Number, default: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, required: true, default: 'Credit Card' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
