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

    // Check if already exists
    const updatedmember = await SaveMember.findOneAndUpdate({ membershipId }, { userName, padvi, affiliation }, { new : true,upsert: true });

    res.json({
        success: true,
        message: "Member updated successfully",
        member: updatedmember
      });
    

    

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// ✅ GET Member by Membership ID
router.get("/member-by-id/:id", async (req, res) => {
  try {
    const member = await SaveMember.findOne({
      membershipId: req.params.id
    });

    if (!member) {
      return res.json({ success: false, message: "Member not found" });
    }

    res.json({
      success: true,
      member
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
module.exports = router;