import express from 'express';
import Cart from '../Models/Cart.js';
import Service from '../Models/Service.js';
import { authMiddleware } from '../Middlewares/auth.js';

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate('serviceId');
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart or increment quantity
// @access  Private
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: 'Service ID is required' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if service already in cart
    let cartItem = await Cart.findOne({ userId, serviceId });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.json({ message: 'Cart item quantity updated', cartItem });
    }

    // Otherwise create new entry
    cartItem = new Cart({
      userId,
      serviceId,
      price: service.price,
      quantity: 1
    });

    await cartItem.save();
    res.status(201).json({ message: 'Service added to cart', cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
});

// @route   DELETE /api/cart/remove/:serviceId
// @desc    Remove service from cart
// @access  Private
router.delete('/remove/:serviceId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId } = req.params;

    const result = await Cart.deleteOne({ userId, serviceId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Service not found in cart' });
    }

    res.json({ message: 'Service removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
});

// @route   POST /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.post('/clear', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.deleteMany({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
});

export default router;
