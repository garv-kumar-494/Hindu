// server.js
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model("User", userSchema, "members");




// 🔐 LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Email check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not registered" });
    }

    // 2️⃣ Password check
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 3️⃣ Success
    res.json({
      message: "Login successful",
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;