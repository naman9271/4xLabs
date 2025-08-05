import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user with default 'client' role
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roles: ['client'], // Default role as specified
  });

  // Remove password from response
  const createdUser = await User.findById(user._id).select('-password');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res
    .status(201)
    .json(new ApiResponse(createdUser, 'User registered successfully', 201));
});

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY || '24h',
    }
  );

  // Prepare user data for response (without password)
  const loggedInUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    profile: user.profile,
    createdAt: user.createdAt,
  };

  // Set token in httpOnly cookie
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  };

  return res
    .status(200)
    .cookie('token', token, options)
    .json(
      new ApiResponse(
        {
          token,
          user: loggedInUser,
        },
        'User logged in successfully',
        200
      )
    );
});

export { register, login };