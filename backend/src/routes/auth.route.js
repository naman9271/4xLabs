

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/v1/auth/register - Register a new user
router.post('/register', register);

// POST /api/v1/auth/login - Authenticate user and return JWT
router.post('/login', login);

export default router;