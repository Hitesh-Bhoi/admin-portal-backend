const express = require("express");
const {
  getAllUsers,
  updateSingleUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

// all users
router.get("/users", getAllUsers);

// single user
router.get("/user/:id", getUser);

// update single user
// router.put("/update-user", updateSingleUser);

module.exports = router;
