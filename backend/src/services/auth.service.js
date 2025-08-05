// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.models.js';
// import { ApiError } from '../utils/ApiError.js';

// class AuthService {
//   // Register new user (business logic)
//   static async registerUser(userData) {
//     const { name, email, password, role = 'client' } = userData;

//     // Business rule: Email uniqueness check
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw new ApiError(409, 'User with this email already exists');
//     }

//     // Business rule: Password strength validation
//     if (password.length < 6) {
//       throw new ApiError(400, 'Password must be at least 6 characters long');
//     }

//     // Business rule: Valid role assignment
//     const validRoles = ['client', 'admin'];
//     if (!validRoles.includes(role)) {
//       throw new ApiError(400, 'Invalid role specified');
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create user with business rules
//     const user = await User.create({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       password: hashedPassword,
//       roles: [role], // Default to single role
//     });

//     // Return user without password
//     return await User.findById(user._id).select('-password');
//   }

//   // Authenticate user (business logic)
//   static async authenticateUser(email, password) {
//     // Find user
//     const user = await User.findOne({ 
//       email: email.toLowerCase().trim() 
//     });

//     if (!user) {
//       throw new ApiError(401, 'Invalid email or password');
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new ApiError(401, 'Invalid email or password');
//     }

//     return user;
//   }

//   // Generate JWT token (business logic)
//   static generateToken(user) {
//     const payload = {
//       id: user._id,
//       email: user.email,
//       roles: user.roles,
//     };

//     const token = jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRY || '7d',
//       }
//     );

//     return token;
//   }

//   // Verify JWT token (business logic)
//   static async verifyToken(token) {
//     try {
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Find user and ensure they still exist
//       const user = await User.findById(decodedToken?.id).select('-password');
      
//       if (!user) {
//         throw new ApiError(401, 'User not found - token invalid');
//       }

//       return user;
//     } catch (error) {
//       throw new ApiError(401, 'Invalid or expired token');
//     }
//   }

//   // Check if user has required role (business logic)
//   static hasRole(user, requiredRoles) {
//     if (!user || !user.roles) {
//       return false;
//     }

//     return requiredRoles.some(role => user.roles.includes(role));
//   }

//   // Update user role (admin business logic)
//   static async updateUserRole(userId, newRoles, adminId) {
//     // Business rule: Only admins can update roles
//     const admin = await User.findById(adminId);
//     if (!admin.roles.includes('admin')) {
//       throw new ApiError(403, 'Only admin can update user roles');
//     }

//     // Business rule: Cannot remove own admin role
//     if (userId === adminId && !newRoles.includes('admin')) {
//       throw new ApiError(400, 'Cannot remove your own admin role');
//     }

//     // Business rule: Validate roles
//     const validRoles = ['client', 'admin'];
//     const invalidRoles = newRoles.filter(role => !validRoles.includes(role));
    
//     if (invalidRoles.length > 0) {
//       throw new ApiError(400, `Invalid roles: ${invalidRoles.join(', ')}`);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: { roles: [...new Set(newRoles)] } }, // Remove duplicates
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!updatedUser) {
//       throw new ApiError(404, 'User not found');
//     }

//     return updatedUser;
//   }
// }

// export default AuthService;
