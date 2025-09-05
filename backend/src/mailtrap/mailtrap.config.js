import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail
    pass: process.env.GMAIL_PASS, // 16-char App Password
  },
});

export const sender = {
  email: process.env.GMAIL_USER,
  name: "Fyndi",
};
