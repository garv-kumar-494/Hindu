const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();



// ================= SCHEMA + MODEL =================
const templeSchema = new mongoose.Schema(
  {
    templeName: { type: String, required: true },
    templeLocation: { type: String, required: true },
    templeState: { type: String, required: true }
  },
  { timestamps: true }
);

const Temple = mongoose.model("Temple", templeSchema);

// ================= MONGODB =================

// ================= API =================
router.post("/api/temples", async (req, res) => {
  try {
    const { templeName, templeLocation, templeState } = req.body;

    if (!templeName || !templeLocation || !templeState) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newTemple = await Temple.create({
      templeName,
      templeLocation,
      templeState
    });

    res.status(201).json({
      success: true,
      message: "Temple added successfully",
      data: newTemple
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Test Route
// ================= GET ALL TEMPLES API =================
router.get("/api/temples", async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: temples.length,
      data: temples
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


module.exports = router;