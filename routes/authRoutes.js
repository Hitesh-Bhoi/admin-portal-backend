const express = require("express");
const { signUpController, signInController } = require("../controllers/authController");
const router = express.Router();

// sign-up
router.post("/sign-up", signUpController);
// sign-in
router.post("/sign-in", signInController)

module.exports = router;