import express from 'express';
import Order from '../Models/Order.js';
import Service from '../Models/Service.js';
import Cart from '../Models/Cart.js';
import { authMiddleware } from '../Middlewares/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderedServices, customerDetails, fromCart } = req.body;

    if (!orderedServices || !Array.isArray(orderedServices) || orderedServices.length === 0) {
      return res.status(400).json({ message: 'Ordered services list is required' });
    }

    if (!customerDetails || !customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      return res.status(400).json({ message: 'Name, email, and phone number are required' });
    }

    let totalAmount = 0;
    const resolvedServices = [];

    // Verify services & fetch exact price from database to prevent clients from tampering with rates
    for (const item of orderedServices) {
      const service = await Service.findById(item.serviceId);
      if (!service) {
        return res.status(404).json({ message: `Service with ID ${item.serviceId} not found` });
      }

      const quantity = item.quantity || 1;
      const price = service.price;
      totalAmount += price * quantity;

      resolvedServices.push({
        serviceId: service._id,
        name: service.name,
        price: price,
        quantity: quantity
      });
    }

    const newOrder = new Order({
      userId,
      orderedServices: resolvedServices,
      totalAmount,
      paymentStatus: 'Pending',
      orderStatus: 'Placed',
      customerDetails
    });

    const savedOrder = await newOrder.save();

    // Clear cart items if requested
    if (fromCart) {
      const serviceIds = resolvedServices.map(s => s.serviceId);
      await Cart.deleteMany({ userId, serviceId: { $in: serviceIds } });
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Owner check
    if (order.userId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access to order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order detail:', error);
    res.status(500).json({ message: 'Server error retrieving order detail' });
  }
});

export default router;
