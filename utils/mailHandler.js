const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e0386b70b8e112",
    pass: "xxxxx"
  }
});

module.exports = {
  sendPasswordEmail: async function (toEmail, username, password) {
    try {
      await transporter.sendMail({
        from: '"User Management" <your_email@gmail.com>',
        to: toEmail,
        subject: "Your New Account Information",
        text: `Hello ${username},\n\nYour account has been created successfully.\nYour login credentials are:\nUsername: ${username}\nPassword: ${password}\n\nPlease change your password after logging in.`,
        html: `<p>Hello <b>${username}</b>,</p>
               <p>Your account has been created successfully.</p>
               <p>Your login credentials are:</p>
               <ul>
                 <li><b>Username:</b> ${username}</li>
                 <li><b>Password:</b> ${password}</li>
               </ul>
               <p>Please change your password after logging in.</p>`,
      });
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  },
};
