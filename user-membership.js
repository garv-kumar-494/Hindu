const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// 🔹 Schema
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

// 🔹 Model
const Membership = mongoose.model("Membership", memberSchema);




// 🔍 CHECK USER MEMBERSHIP (USER SIDE)
router.get("/check-membership", async (req, res) => {
  const { email } = req.query;

  try {
    const member = await Membership.findOne({ email });

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