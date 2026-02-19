const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// ✅ Member Schema
const savememberSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  membershipId: { type: String, required: true, unique: true }, // 🔥 UNIQUE
  padvi: { type: String },
  affiliation: { type: String }
});

const SaveMember = mongoose.model("SaveMember", savememberSchema);

// ✅ Save Member (No Duplicate)
router.post("/save-membersss", async (req, res) => {
  try {
    const { userName, membershipId, padvi, affiliation } = req.body;

    await SaveMember.updateOne(
      { membershipId },
      { userName, padvi, affiliation },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Member inserted or updated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;