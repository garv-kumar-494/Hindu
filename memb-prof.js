const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// Schema
const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  temple: String,
  membershipStatus: {
    type: String,
    default: "locked"
    } // 🔒 by default locked
});

const Member = mongoose.model("Member", memberSchema);

// API
router.post("/save", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.json({ message: "Data saved successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data ❌" });
  }
});

// signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ email, password });
  await newUser.save();

  res.json({ message: "Signup successful" });
});


// 🔍 CHECK USER MEMBERSHIP (USER SIDE)
router.get("/check-membership", async (req, res) => {
  const { email } = req.query;

  try {
    const member = await Member.findOne({ email });

    if (!member) {
      return res.json({ membershipStatus: "locked" });
    }

    res.json({
      membershipStatus: member.membershipStatus
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});










module.exports = router;