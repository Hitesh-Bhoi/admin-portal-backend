const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
// sign-up user
const signUpController = async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            res.status(409).json({message: "User already exists"});
        } else {
            const hasPass = await bcrypt.hash(req.body.password, 10);
            console.log(hasPass)
            const payload = {
                fullname: req.body.fullname,
                email: req.body.email,
                password: hasPass
            }
            await User.insertOne(payload);
            res.status(200).json({message: "User registered successfully"});
        }
    } catch (error) {
        console.log("Server error during user registration", error);
        res.status(500).json({message: "Server error during user registration"});
    }
}
const signInController = async(req, res) =>{
    try {
        const {email, password, rememberMe} = req.body;
        const user = await User.findOne({email});

        if(user) {
            const validPass = await bcrypt.compare(password, user.password);
            if(validPass) {
                const token = jwt.sign(
                    {id: user._id, email: user.email},
                    jwt_secret,
                    {expiresIn: rememberMe ? "30d" : "1d"}
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 30*24*60*60*1000
            });
            res.status(200).json({message: "Sign-in successfull", data: {name: user.fullname,email: user.email}, token});
            } else {
                res.status(401).json({message: "Invalid password"})
            }
        } else {
            res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        console.log("Server error during user login", error)
        res.status(500).json({message: "Server error during user login"});
}
}
const verifyUserController = async(req,res,next)=>{
    const token = req.cookies.token;
    try {
        if(token) {
            const decoded = await jwt.verify(token, jwt_secret);
            req.user = decoded;
            res.status(200).json({ message: "User is logged in", user: req.user });
        } else {
            res.status(200).json({message: "User not logged in"})
        }
    } catch (error) {
        console.log("Verify user error", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}
module.exports = { signUpController, signInController, verifyUserController }