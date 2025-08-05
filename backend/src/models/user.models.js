import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },

  password: {
    type: String,
    required: true,
  },

  roles: {
    type: [String],
    enum: ['client', 'admin'],
    default: ['client'],
    required: true,
  },

  profile: {
    title: { type: String },
    bio: { type: String },
    skills: { type: [String] },
    portfolioUrl: { type: String },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
