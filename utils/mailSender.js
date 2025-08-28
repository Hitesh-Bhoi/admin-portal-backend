const User = require("../models/userSchema");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const resetPasswordTemplate = require("./mailTemplate");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const mailSender = async ({ email, user }) => {
  try {
    const tokenExpiresIn = "5m";
    const resetToken = jwt.sign(
      {id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      {expiresIn: tokenExpiresIn}
    );
    const hashToken = await bcrypt.hash(resetToken, 10);
    const html = resetPasswordTemplate({userInfo:user, token: resetToken, expiresIn: tokenExpiresIn});
    const msg = {
      'to': email,
      'from': process.env.SENDER_EMAIL,
      'subject': "Reset password request",
      html,
    };
    await sgMail.send(msg);
    await User.findOneAndUpdate(
      {email},
      {
        resetPasswordToken: hashToken,
        resetPasswordExpire: Date.now() + 1000*60*5 //5min
      }
    )
    console.log("Mail sent successfully to", email);
    return true;
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = mailSender;
