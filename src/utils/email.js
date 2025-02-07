import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (message) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "recipient@example.com",
      subject: "New Notification",
      text: message,
    });
    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.error("❌ Email Sending Failed", error);
  }
};

export default sendEmail;
