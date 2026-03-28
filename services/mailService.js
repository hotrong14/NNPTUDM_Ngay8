import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendPasswordMail(email, password, retry = 3) {
  try {
    await transporter.sendMail({
      from: '"System" <no-reply@test.com>',
      to: email,
      subject: "Your Account Password",
      text: `Your password is: ${password}`
    });
  } catch (err) {
    console.log(`Retry sending to ${email}...`);

    if (retry > 0) {
      await sleep(3000);
      return sendPasswordMail(email, password, retry - 1);
    } else {
      console.error(`Failed: ${email}`);
    }
  }
}