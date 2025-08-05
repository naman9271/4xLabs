import User from '../models/user.models.js';
import Quote from '../models/quote.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

// GET /api/v1/admin/users - Get all users (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role } = req.query;

  // Build query
  let query = {};
  
  // Filter by role if provided
  if (role) {
    const validRoles = ['client', 'admin'];
    if (!validRoles.includes(role)) {
      throw new ApiError(400, 'Invalid role filter. Must be client or admin');
    }
    query.roles = { $in: [role] };
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  
  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    throw new ApiError(400, 'Invalid pagination parameters');
  }

  const skip = (pageNum - 1) * limitNum;

  // Get users with pagination
  const users = await User.find(query)
    .select('-password') // Exclude passwords
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .lean();

  // Get total count for pagination
  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limitNum);

  // Format response
  const formattedUsers = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    profile: user.profile,
    createdAt: user.createdAt,
  }));

  const responseData = {
    users: formattedUsers,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalUsers,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(responseData, 'Users retrieved successfully', 200));
});

// PUT /api/v1/admin/users/:id/role - Update user roles (Admin only)
const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid user ID format');
  }

  // Validate roles array
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    throw new ApiError(400, 'Roles must be a non-empty array');
  }

  // Validate each role
  const validRoles = ['client', 'admin'];
  const invalidRoles = roles.filter(role => !validRoles.includes(role));
  
  if (invalidRoles.length > 0) {
    throw new ApiError(400, `Invalid roles: ${invalidRoles.join(', ')}. Valid roles are: ${validRoles.join(', ')}`);
  }

  // Remove duplicates
  const uniqueRoles = [...new Set(roles)];

  // Find user
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Prevent admin from removing their own admin role
  if (user._id.toString() === req.user._id.toString() && !uniqueRoles.includes('admin')) {
    throw new ApiError(400, 'You cannot remove your own admin role');
  }

  // Update user roles
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { roles: uniqueRoles } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    throw new ApiError(500, 'Error updating user roles');
  }

  // Format response
  const formattedUser = {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    roles: updatedUser.roles,
    profile: updatedUser.profile,
    createdAt: updatedUser.createdAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(formattedUser, 'User roles updated successfully', 200));
});

// GET /api/v1/admin/quotes - Get all quotes (Admin only)
const getAllQuotes = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  // Build query
  let query = {};
  
  // Filter by status if provided
  if (status) {
    const validStatuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status filter');
    }
    query.status = status;
  }

  // Calculate pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  
  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    throw new ApiError(400, 'Invalid pagination parameters');
  }

  const skip = (pageNum - 1) * limitNum;

  // Get quotes with pagination and populate related data
  const quotes = await Quote.find(query)
    .populate('project', 'title status client')
    .populate('project.client', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .lean();

  // Get total count for pagination
  const totalQuotes = await Quote.countDocuments(query);
  const totalPages = Math.ceil(totalQuotes / limitNum);

  // Format response
  const formattedQuotes = quotes.map(quote => ({
    id: quote._id,
    project: quote.project ? {
      id: quote.project._id,
      title: quote.project.title,
      status: quote.project.status,
      client: quote.project.client
    } : null,
    amount: quote.amount,
    description: quote.description,
    estimatedDuration: quote.estimatedDuration,
    status: quote.status,
    validUntil: quote.validUntil,
    terms: quote.terms,
    createdBy: quote.createdBy ? {
      id: quote.createdBy._id,
      name: quote.createdBy.name,
      email: quote.createdBy.email
    } : null,
    sentAt: quote.sentAt,
    respondedAt: quote.respondedAt,
    notes: quote.notes,
    createdAt: quote.createdAt,
  }));

  const responseData = {
    quotes: formattedQuotes,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalQuotes,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(responseData, 'Quotes retrieved successfully', 200));
});

// PUT /api/v1/admin/quotes/:id - Update quote (Admin only)
const updateQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, amount, description, estimatedDuration, validUntil, terms, notes } = req.body;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid quote ID format');
  }

  // Find quote
  const quote = await Quote.findById(id);
  if (!quote) {
    throw new ApiError(404, 'Quote not found');
  }

  // Build update object
  const updateData = {};

  // Validate and set status if provided
  if (status !== undefined) {
    const validStatuses = ['draft', 'sent', 'accepted', 'rejected', 'expired'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status value');
    }
    updateData.status = status;
    
    // Set sentAt timestamp when status changes to 'sent'
    if (status === 'sent' && quote.status !== 'sent') {
      updateData.sentAt = new Date();
    }
    
    // Set respondedAt timestamp when status changes to accepted/rejected
    if ((status === 'accepted' || status === 'rejected') && 
        !['accepted', 'rejected'].includes(quote.status)) {
      updateData.respondedAt = new Date();
    }
  }

  // Validate and set amount if provided
  if (amount !== undefined) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new ApiError(400, 'Amount must be a positive number');
    }
    updateData.amount = amount;
  }

  // Set description if provided
  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim() === '') {
      throw new ApiError(400, 'Description must be a non-empty string');
    }
    updateData.description = description.trim();
  }

  // Set estimatedDuration if provided
  if (estimatedDuration !== undefined) {
    if (typeof estimatedDuration !== 'string' || estimatedDuration.trim() === '') {
      throw new ApiError(400, 'Estimated duration must be a non-empty string');
    }
    updateData.estimatedDuration = estimatedDuration.trim();
  }

  // Validate and set validUntil if provided
  if (validUntil !== undefined) {
    const validUntilDate = new Date(validUntil);
    if (isNaN(validUntilDate.getTime())) {
      throw new ApiError(400, 'Invalid validUntil date format');
    }
    if (validUntilDate < new Date()) {
      throw new ApiError(400, 'Valid until date cannot be in the past');
    }
    updateData.validUntil = validUntilDate;
  }

  // Set terms if provided
  if (terms !== undefined) {
    updateData.terms = typeof terms === 'string' ? terms.trim() : '';
  }

  // Set notes if provided
  if (notes !== undefined) {
    updateData.notes = typeof notes === 'string' ? notes.trim() : '';
  }

  // Check if there's anything to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No valid update data provided');
  }

  // Update quote
  const updatedQuote = await Quote.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate('project', 'title status client')
    .populate('project.client', 'name email')
    .populate('createdBy', 'name email')
    .lean();

  // Format response
  const formattedQuote = {
    id: updatedQuote._id,
    project: updatedQuote.project ? {
      id: updatedQuote.project._id,
      title: updatedQuote.project.title,
      status: updatedQuote.project.status,
      client: updatedQuote.project.client
    } : null,
    amount: updatedQuote.amount,
    description: updatedQuote.description,
    estimatedDuration: updatedQuote.estimatedDuration,
    status: updatedQuote.status,
    validUntil: updatedQuote.validUntil,
    terms: updatedQuote.terms,
    createdBy: updatedQuote.createdBy ? {
      id: updatedQuote.createdBy._id,
      name: updatedQuote.createdBy.name,
      email: updatedQuote.createdBy.email
    } : null,
    sentAt: updatedQuote.sentAt,
    respondedAt: updatedQuote.respondedAt,
    notes: updatedQuote.notes,
    createdAt: updatedQuote.createdAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(formattedQuote, 'Quote updated successfully', 200));
});

export { getAllUsers, updateUserRole, getAllQuotes, updateQuote };
