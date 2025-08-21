const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const mailSender = async ({ to, subject, text, html }) => {
  try {
    const msg = {
      to,
      from: process.env.SENDER_EMAIL,
      subject,
      text,
      html,
    };
    await sgMail.send(msg);
    console.log("Mail sent successfully to", to);
    return true;
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = mailSender;
