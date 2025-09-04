import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => { 
  const { email, password, firstName, lastName } = req.body;

  try {
    if(!email || !password || !firstName || !lastName) {
      throw new error("All fields are required");
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
  }
}

export async function login( req, res) {
  res.send("login Route")
}

export async function logout( req, res) {
  res.send("logout Route")
}