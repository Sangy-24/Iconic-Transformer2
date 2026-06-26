import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './Routes/auth.js';

dotenv.config();
``
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ghumresangram_db_user:SPti3fhVAnTGbMhF@cluster0.ahjca2j.mongodb.net/Users?appName=Cluster0';

// Basic Auth Middleware
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

// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Iconic Transformers API running...');
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
