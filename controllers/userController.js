const User = require("../models/userSchema");

const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        console.log("Error while getting all users", error);
        res.status(500).json({ message: "Fetching all users data faild" });
    }
};

module.exports = { getAllUsers }

