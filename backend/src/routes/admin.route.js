import express from 'express';
import { 
  getAllUsers, 
  updateUserRole, 
  getAllQuotes, 
  updateQuote 
} from '../controllers/admin.controller.js';
import { verifyJWT, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyJWT);
router.use(authorize('admin'));

// /api/v1/admin/users routes - User management (Admin only)
router.route('/users')
  .get(getAllUsers); // Get all users with optional filtering

// /api/v1/admin/users/:id/role routes - User role management (Admin only)
router.route('/users/:id/role')
  .put(updateUserRole); // Update user roles

// /api/v1/admin/quotes routes - Quote management (Admin only)
router.route('/quotes')
  .get(getAllQuotes); // Get all quotes with optional filtering

// /api/v1/admin/quotes/:id routes - Specific quote operations (Admin only)
router.route('/quotes/:id')
  .put(updateQuote); // Update quote (e.g., send to client)

export default router;
