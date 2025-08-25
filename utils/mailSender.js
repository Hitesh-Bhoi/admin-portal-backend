const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const resetPasswordTemplate = require("./mailTemplate");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const mailSender = async ({ email, user }) => {
  try {
    const tokenExpiresIn = "15m";
    const resetToken = jwt.sign(
      {id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      {expiresIn: tokenExpiresIn}
    );
    const html = resetPasswordTemplate({userInfo:user, token: resetToken, expiresIn: tokenExpiresIn});
    const msg = {
      'to': email,
      'from': process.env.SENDER_EMAIL,
      'subject': "Reset password request",
      html,
    };
    await sgMail.send(msg);
    console.log("Mail sent successfully to", email);
    return true;
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = mailSender;
