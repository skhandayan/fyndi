import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {

  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken),
      category: "Email Verification"
    });

    console.log("Email sent successfully", response);
    
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new error(`Error sending verification email: ${error}`)
  }
}


export const sendWelcomeEmail = async (email, firstName) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "d139b57c-a3ae-4a57-a258-d733bfb96b33",
      template_variables: {
        "name": firstName,
        "company_info_name": "Fyndi"
      }
    });

    console.log("Email sent welcome successfully", response);
    
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
    
  }
}