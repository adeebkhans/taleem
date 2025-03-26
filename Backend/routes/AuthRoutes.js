const express = require("express");
const { signup, login, googleLogin, logout } = require("../controllers/AuthController");

const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google-login", googleLogin);

module.exports = router;
