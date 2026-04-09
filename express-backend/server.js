import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import authRoutes from './routes/auth.js';
import clubRoutes from './routes/clubs.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || 
        ['http://localhost:5173', 'http://127.0.0.1:5173'].includes(origin) || 
        origin.includes('vercel.app') || 
        origin.includes('onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'secret-key-123'],
  maxAge: 24 * 60 * 60 * 1000
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});