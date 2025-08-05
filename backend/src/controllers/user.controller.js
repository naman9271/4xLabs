import User from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/v1/users/me - Get current user profile
const getProfile = asyncHandler(async (req, res) => {
  // User is already attached to req by auth middleware
  const user = req.user;

  // Prepare user data for response (password already excluded in middleware)
  const userProfile = {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    profile: user.profile,
    createdAt: user.createdAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(userProfile, 'User profile retrieved successfully', 200));
});

// PUT /api/v1/users/me - Update current user profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, profile } = req.body;
  
  // Build update object with only provided fields
  const updateData = {};
  
  if (name !== undefined) {
    if (name.trim() === '') {
      throw new ApiError(400, 'Name cannot be empty');
    }
    updateData.name = name.trim();
  }

  if (profile !== undefined) {
    // Validate profile fields if provided
    if (profile.title !== undefined) {
      updateData['profile.title'] = profile.title.trim();
    }
    if (profile.bio !== undefined) {
      updateData['profile.bio'] = profile.bio.trim();
    }
    if (profile.skills !== undefined) {
      if (Array.isArray(profile.skills)) {
        updateData['profile.skills'] = profile.skills.filter(skill => 
          typeof skill === 'string' && skill.trim() !== ''
        );
      } else {
        throw new ApiError(400, 'Skills must be an array of strings');
      }
    }
    if (profile.portfolioUrl !== undefined) {
      // Basic URL validation
      if (profile.portfolioUrl && profile.portfolioUrl.trim() !== '') {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(profile.portfolioUrl.trim())) {
          throw new ApiError(400, 'Invalid portfolio URL format');
        }
        updateData['profile.portfolioUrl'] = profile.portfolioUrl.trim();
      } else {
        updateData['profile.portfolioUrl'] = '';
      }
    }
  }

  // If no valid updates provided
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No valid update data provided');
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { 
      new: true, 
      runValidators: true 
    }
  ).select('-password');

  if (!updatedUser) {
    throw new ApiError(500, 'Error updating user profile');
  }

  // Prepare response data
  const userProfile = {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    roles: updatedUser.roles,
    profile: updatedUser.profile,
    createdAt: updatedUser.createdAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(userProfile, 'Profile updated successfully', 200));
});

export { getProfile, updateProfile };
