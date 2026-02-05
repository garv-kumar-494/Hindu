const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: String,
  eventTime: String,
  eventLocation: String,
  description: String
});

const EventAdmin = mongoose.model("EventAdmin", eventSchema);

// API → Get all events
router.get("/admin", async (req, res) => {
  try {
    const events = await EventAdmin.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;