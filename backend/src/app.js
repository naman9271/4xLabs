import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
// to connect with frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// to take json data
app.use(express.json({ limit: '16kb' }));
// to take url data
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
//to store data
app.use(express.static('public'));
// to read data from cokkies
app.use(cookieParser());

//routes import
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

//declaring routes
app.use('/api/v1/auth', authRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

export { app };
