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

const Event = mongoose.model("Event", eventSchema);

// API → Get all events
router.get("/user/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;