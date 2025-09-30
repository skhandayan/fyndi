import bcryptjs from 'bcryptjs';
import crypto from "crypto";

import { User } from "../models/user.model.js";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail,  } from "../mailtrap/emails.js";

export const signup = async (req, res) => { 
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new error("All fields are required");
    }

    if(password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password do not match" })
    }

    const userAlreadyExists = await User.findOne({email});
    console.log("User already exists",userAlreadyExists);
    
    if(userAlreadyExists) {
      return res.status(400).json({
        success: false, 
        message: "User already exists"})
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      verificationToken: verificationToken,
      verificationExpiredAt: Date.now() + 24 * 60 * 60 * 1000
    })

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id)

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiredAt: { $gt: Date.now() }
    })

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code"
      })
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiredAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.firstName);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    console.log("Error in verifyEmail ", error);
    
    res.status(500).json({
      success: false,
      message: "Server error"
    })

    throw new Error("All fields are required");

  }
}

export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    const newVerificationToken = generateVerificationToken();
    user.verificationToken = newVerificationToken;
    user.verificationExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(user.email, newVerificationToken);

    res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email",
    });
  } catch (error) {
    console.error("Error in resendVerificationCode:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if(!user) {
      return res.status(400).json({
        success: false,
        message:"Invalid credentials"
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    console.log("Error in login", error);
    
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export async function logout(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
}

export async function forgotPassword(req, res) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiredAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail( user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    })
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
  
}

export const resetPassword = async (req, res) => {
  
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpiredAt: { $gt: Date.now() },
    })

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired reset token"
      });
    }

    const isSamePassword = await bcryptjs.compare(password, user.password);
    
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    const hashedPassword = await bcryptjs.hash( password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiredAt = undefined;
    await user.save();

    sendResetSuccessEmail(user.email)

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({
      success: false,
      message: error.message
    })
    
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({
      success: false,
      message: error.message
    })
    
  }
}