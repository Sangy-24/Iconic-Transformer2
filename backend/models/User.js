import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  avatar: { type: String, default: 'default_avatar.png' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  purchasedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
