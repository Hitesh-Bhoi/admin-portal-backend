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

const getUser = async(req,res) => {
    try {
        const _id = req.params.id
        const user = await User.findOne({_id});
        res.status(200).json({ data: user });
    } catch (error) {
        console.log("Error while getting single user data", error);
    }
}

// const updateSingleUser = async(req,res)=>{
//     try {
//         console.log("body", req.body);
//     } catch (error) {
//         console.log("Error while updating user data", error);
//     }
// }

module.exports = { getAllUsers, getUser, updateSingleUser }

