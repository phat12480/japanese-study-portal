const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // token từ Google Identity

    if (!credential) {
      return res.status(400).json({ msg: "Missing credential" });
    }

    // Decode token từ Google
    const googleUser = JSON.parse(
      Buffer.from(credential.split(".")[1], "base64").toString()
    );

    const email = googleUser.email;
    const name = googleUser.name || "Google User";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google_oauth_no_password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, user });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ msg: "Google login failed" });
  }
};
