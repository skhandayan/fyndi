import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from "./emailTempates.js"
import { transporter , sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "You got Hacked by Fyndi!!!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    });

    console.log("Email sent successfully", response);
    
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new error(`Error sending verification email: ${error}`)
  }
}


export const sendWelcomeEmail = async (email, firstName) => {

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Welcome ${firstName} to`,
      html: WELCOME_TEMPLATE.replace("{firstName}", firstName),
      category: "Welcome Email"
      
    });

    console.log("Email sent welcome successfully", response);
    
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
    
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset your pasword",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset"
    })
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })

    console.log("Passord reset email sent successfully", response);
    
  } catch (error) {
    console.error("Error sending password reset success email", error);

    throw new Error(`Error sending password reset success email: ${error}`);
    
  }
}