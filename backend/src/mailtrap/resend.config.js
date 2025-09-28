import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: 'fyndiphmailer@fyndi.site',
  name: "Fyndi Philippines",
};

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: `${sender.name} <${sender.email}>`,
//       to,
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return { success: false, error };
//     }

//     return { success: true, data };
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return { success: false, error: err };
//   }
// };
