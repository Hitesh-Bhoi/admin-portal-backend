const User = require("../models/userSchema");

// All users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    console.log("Error while fetching all user details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Single user
const getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error while fetching single user details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateSingleUser = async(req,res)=>{
//     try {
//         console.log("body", req.body);
//     } catch (error) {
//         console.log("Error while updating user data", error);
//     }
// }

module.exports = { getAllUsers, getUser };
