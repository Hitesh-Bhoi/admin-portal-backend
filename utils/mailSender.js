const User = require("../models/userSchema");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const resetPasswordTemplate = require("./mailTemplate");
require("dotenv").config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// Send reset password mail
const mailSender = async ({ email, user }) => {
  try {
    // JWT token expiry time
    const tokenExpiresIn = "5m";

    // Generating reset password token
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiresIn }
    );
    // Encode reset password token
    const hashToken = await bcrypt.hash(resetToken, 10);
    const html = resetPasswordTemplate({
      userInfo: user,
      token: resetToken,
      expiresIn: tokenExpiresIn,
    });
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Reset password request",
      html,
    };
    await sgMail.send(msg);
    // Update user details
    await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: hashToken,
        resetPasswordExpire: Date.now() + 1000 * 60 * 5, //5min
      }
    );
    console.log("Mail sent successfully to", email);
    return true;
  } catch (error) {
    console.log("Error while sending reset password mail", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = mailSender;
