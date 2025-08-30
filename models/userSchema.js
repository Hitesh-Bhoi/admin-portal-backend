const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  resetPasswordToken: {
    require: false,
    type: String,
    unique: true,
  },
  resetPasswordExpire: {
    require: false,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
