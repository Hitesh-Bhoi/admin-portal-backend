const express = require("express");
const { signUpController, signInController, verifyUserController, signOutController } = require("../controllers/authController");
const sendMail = require("../controllers/SendEmailController");
const router = express.Router();

// sign-up
router.post("/sign-up", signUpController);
// sign-in
router.post("/sign-in", signInController);
// check for user loggedIn or not
router.get("/verify-me", verifyUserController);
// sign-out
router.post("/sign-out", signOutController);
// forgot pass
router.post("/forgot-password/:id", sendMail);

module.exports = router;