import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
} from "./emailTempates.js";
import { resend, sender } from "./resend.config.js"; // <-- we'll make this instead of mailtrap.config.js

// Verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const { data, error } = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: "Welcome to Fyndi!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });

    if (error) throw error;

    console.log("Verification email sent successfully", data);
    return data;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

// Welcome email
export const sendWelcomeEmail = async (email, firstName) => {
  const recipient = [{ email }];
  try {
    const { data, error } = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: `Welcome ${firstName} to Fyndi!`,
      html: WELCOME_TEMPLATE.replace("{firstName}", firstName),
    });

    if (error) throw error;

    console.log("Welcome email sent successfully", data);
    return data;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

// Password reset request
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const { data, error } = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    if (error) throw error;

    console.log("Password reset request email sent successfully", data);
    return data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

// Password reset success
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const { data, error } = await resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    if (error) throw error;

    console.log("Password reset success email sent successfully", data);
    return data;
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};
