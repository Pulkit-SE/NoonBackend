const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

// Login route
router.post("/login", authController.login);

// Signup route
router.post("/register", authController.register);

router.post("/user-details", authController.userDetails);

router.post("/update-user", authController.updateUser);

module.exports = router;
