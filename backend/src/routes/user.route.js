import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { verifyJWT, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All user routes require authentication
router.use(verifyJWT);

// /api/v1/users/me routes - User profile management
// Accessible by: Client, Admin
router.route('/me')
  .get(authorize('client', 'admin'), getProfile)  // Get current user profile
  .put(authorize('client', 'admin'), updateProfile); // Update current user profile

export default router;
