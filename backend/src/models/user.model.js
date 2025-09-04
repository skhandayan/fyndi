import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  lastLogin: {
    type: Date,
    default: Date.now
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  resetPasswordToken: String,
  resetPasswordExpiredAt: Date,
  verificationToken: String,
  verificationExpiredAt: Date,

}, {timestamps: true});

export const User = mongoose.model('User', userSchema)