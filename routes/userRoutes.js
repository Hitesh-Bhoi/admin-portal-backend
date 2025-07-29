const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

// all users
router.get("/users", getAllUsers);

module.exports = router;