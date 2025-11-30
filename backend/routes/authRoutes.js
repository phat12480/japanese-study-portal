const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { googleLogin } = require("../controllers/authGoogleController");

// 🚀 Đăng ký + đăng nhập bình thường
router.post("/register", register);
router.post("/login", login);

// 🚀 Google Login
router.post("/google", googleLogin);

module.exports = router;
