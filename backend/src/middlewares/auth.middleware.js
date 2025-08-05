import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Verify JWT token and authenticate user
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = 
      req.cookies?.token || 
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request - No token provided');
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to request
    const user = await User.findById(decodedToken?.id).select('-password');

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token - User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});

// Check if user has required role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    // Check if user has any of the required roles
    const hasRole = roles.some(role => req.user.roles.includes(role));

    if (!hasRole) {
      throw new ApiError(403, 'Access denied - Insufficient permissions');
    }

    next();
  };
};

export { verifyJWT, authorize };
