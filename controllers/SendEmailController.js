const mailSender = require("../utils/mailSender");
const User = require("../models/userSchema");
const sendMail =async(req, res)=>{
  try {
    const findUser = await User.findOne({email:req.params.id})

    if (findUser) {
      await mailSender({ email: req.params.id, user: findUser });
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = sendMail;