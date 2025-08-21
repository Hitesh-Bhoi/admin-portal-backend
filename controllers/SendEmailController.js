const mailSender = require("../utils/mailSender");

const sendMail =async(req, res)=>{
  console.log("body", req.body)
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const success = await mailSender({ to, subject, text, html });

    if (success) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = sendMail;