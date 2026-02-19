const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// ✅ Member Schema
const memberSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  membershipId: { type: String, required: true, unique: true }, // 🔥 UNIQUE
  padvi: { type: String },
  affiliation: { type: String }
});

const Member = mongoose.model("Member", memberSchema);

// ✅ Save Member (No Duplicate)
router.post("/save-membersss", async (req, res) => {
  try {
    const { userName, membershipId, padvi, affiliation } = req.body;

    // Check if already exists
    const existing = await Member.findOne({ membershipId });

    if (existing) {
      return res.json({
        success: true,
        message: "Member already exists"
      });
    }

    const newMember = new Member({
      userName,
      membershipId,
      padvi,
      affiliation
    });

    await newMember.save();

    res.json({
      success: true,
      message: "Member saved successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;