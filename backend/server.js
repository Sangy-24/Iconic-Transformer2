import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './Routes/auth.js';
import servicesRoutes from './Routes/services.js';
import cartRoutes from './Routes/cart.js';
import ordersRoutes from './Routes/orders.js';
import Service from './Models/Service.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ghumresangram_db_user:SPti3fhVAnTGbMhF@cluster0.ahjca2j.mongodb.net/Users?appName=Cluster0';

// Reusable/Basic Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Admin access required');
  }
};

// Services Database Seeder
const seedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      console.log('Seeding initial industrial services...');
      const servicesToSeed = [
        {
          name: "Predictive Coil Calibration",
          description: "Advanced algorithmic testing of winding integrity using harmonic resonance analysis.",
          category: "Predictive Repair",
          price: 2400,
          unit: "/unit",
          label: "Repair",
          labelClass: "bg-primary-container text-on-primary-container",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI5P4xl4wasc2iP-heJwr09hEHcF2Ftp7jzOLcDjg6DyqaL8Av5FJO43SGhGBkiiRES-lhov5bJlI3Z2RhwEaWmB1sHytQqkgdF_j9LH4UxgupzXR3Or34QZEQYDYyX2F4wUjqGbQYY8EuqSBYcYxJ36Dvh28mIc3hsYBBoAXEEV8nj3JqHtFg4qL9siMBZQXVmTgRWs0xHOfoBqmE7cLjDM_Bhpwvfygo9qTLfBaFhctS8xipQj5SYOJ0yFVGBrWig_-0j2ODbVI",
          priceLabel: "Starting at",
          action: "Add",
          primary: false,
          currency: "Rs"
        },
        {
          name: "Gold Maintenance Tier",
          description: "Bi-annual onsite diagnostics with 24/7 remote monitoring and priority response times.",
          category: "AMC Tiers",
          price: 12999,
          unit: "/yr",
          label: "AMC",
          labelClass: "bg-tertiary-container text-on-tertiary-container",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtQtsLfc_u1findz0YAag4tZivia-ucSaxk4EnevhgQs6C-nm47_ht8vJIWW_ygLX3XaYH7MTAttjCRqUmqvMnzmG6QMPDvRf5EcPeyR4wXupruB8P-LFbkkD6x0-4893HwW88tzR0E5lhVP6D13X4QtCw-mdLnNSBTL2u2e8sCcGOr1sOOgnZcwEtgjZkVYm_O-l6x64SRuN8CC1fyk_T5GcTF8wrHDvtFkN9oEop-6Snqk1BOCHsGaF7FNQWA32nHC6O3M65sUc",
          priceLabel: "Annual Fee",
          action: "Quote",
          primary: false,
          currency: "Rs"
        },
        {
          name: "Dielectric Fluid Analysis",
          description: "Full laboratory screening for moisture, acidity, and dissolved gas concentrations.",
          category: "Dielectric Testing",
          price: 850,
          unit: "/test",
          label: "Testing",
          labelClass: "bg-secondary-container text-on-secondary-container",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_mp4JtgNHPLIsXOotfziuRpfxq3txWY3Wck41o3hOpW00umjQquvRHfZsHxbEHyc-XeGqFJKhQBzBk27JH8ZrWZnzc2ri66kHsEkWAc2-eI5fo50SwTIzx5B26eEc0u-a3VSPvfkjDCGkvL6SyPga8ADBmsZgcij9Ge5eb3DQalvISwkze_naNR8ZEiTeqnJPfw0y-DQho9fOtYTTEY0XlT7unjNs-rUGXop-KStdT_rszr8KSjyQexSEPuL959Zf1MGnZvUYO8A",
          priceLabel: "Per Batch",
          action: "Add",
          primary: false,
          currency: "Rs"
        },
        {
          name: "Laser Core Alignment",
          description: "Nanometer-precision structural alignment for maximum electromagnetic efficiency.",
          category: "Precision Tools",
          price: 4200,
          unit: "/fix",
          label: "Tools",
          labelClass: "bg-primary-container text-on-primary-container",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-1a0Qdl2exLAyforEfZ-vmmHuIqQYVLphY4pvsgStAqbKRm3WqIo-3dWo5dlbDJhIHzVM7Nusvqi0qug40BgrCVfNeTRQ5D5NQurjYUEx11I6XcmUlX4khybMgIzKBAkcZW3pODo575zBY5tVc7rPwc24sI30nDG3k3ENsqlNB4xO5-ni9jT2gGya-NEAsJFJSS8wsc5-eyau_32SgSnXbP-Il2FlEVb4f5PBUHx4m2wpJKU1O09iiNeDHb2qLPOdxs6sC_p9Bj8",
          priceLabel: "Service Fee",
          action: "Add",
          primary: false,
          currency: "Rs"
        },
        {
          name: "Thermal Cooling Overhaul",
          description: "Complete descaling of heat exchangers and fan motor efficiency optimization.",
          category: "Predictive Repair",
          price: 1750,
          unit: "/unit",
          label: "Repair",
          labelClass: "bg-primary-container text-on-primary-container",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnVpHEilyyxM2BxSCfvOTV6WavfRvgKPrt8JqOtHg9gddlY0OJokRoG8EaItSlB2O5YtsGf3mqzWAbMJB3gHq8Ehx0IGGLo9y552pKkijeMaoI6ui7paw5VlmYoS9r6QIq4-Nc1MtI3l-W8geoWFyW_P0i27C02BySIOG3OLQmAb4J1G41nt0D7kUaC-GHM-JD5N7nH_FzRcRjjKS3rV5srsSzpEZCwyPTe4ZdeIkow0qrn7oroMUp-Lhvqm36zsx7xeFScbqSU-c",
          priceLabel: "Base Rate",
          action: "Add",
          primary: false,
          currency: "Rs"
        },
        {
          name: "Neural Fault Predictor",
          description: "Cloud-based AI subscription that predicts hardware failure 90 days in advance.",
          category: "Precision Tools",
          price: 499,
          unit: "/mo",
          label: "AI Tools",
          labelClass: "bg-primary text-white",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBwxkayPJMp6S7Svaaw1nZ3rkz16ck2tYvivSlRQLGPnHwRJ3UsABVs1aoxug1y9nmxrpWzXZKJLE44oOq8k5hKttHdamOoIpB8K6HposektwuUiUlzTJi9qc0RF63mF5ex_b9DGp89-ujhtmRceYy_JqQRUz5BSTTLHwHxbiGtYmu0gf-5I-R2RbbdilTVWQauDRxBVlll8guaeQpeArTHxyufkU27hy1H4dvpCzW-JwEkgEmdTo9rJ5leE4A7QVb8s2pKSL60yA",
          priceLabel: "SaaS Plan",
          action: "Subscribe",
          primary: true,
          currency: "Rs"
        }
      ];
      await Service.insertMany(servicesToSeed);
      console.log('Seeding finished successfully.');
    } else {
      console.log('Services collection is already populated.');
    }
    // Migrate any existing USD services to Rs in DB
    const migrationResult = await Service.updateMany({ currency: "$" }, { currency: "Rs" });
    if (migrationResult.modifiedCount > 0) {
      console.log(`Migrated ${migrationResult.modifiedCount} services from USD ($) to INR (Rs).`);
    }
  } catch (err) {
    console.error('Failed to seed/migrate services:', err);
  }
};

// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedServices();
  })
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Iconic Transformers API running...');
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
