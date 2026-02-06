const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// 🔹 Schema
const messageSchema = new mongoose.Schema({
  sender: String,   
  userName: String,    // "admin"
  message: String,
  time: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", messageSchema);

// 🔹 FETCH ADMIN MESSAGES
router.get("/admin-messages", async (req, res) => {
  try {
    const messages = await Message.find({ sender: "admin" })
      .sort({ createdAt: 1 }); // old → new

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// post message and save atlas 

// 🔹 SAVE USER MESSAGE
router.post("/user-message", async (req, res) => {
  try {
    const {  userName, message, time } = req.body;

    const newMsg = new Message({
      sender: "user",
      userName,
      message,
      time
    });

    await newMsg.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔹 FETCH USER MESSAGES
router.get("/load-user-messages", async (req, res) => {
  try {
    const messages = await Message.find({ sender: "user" })
      .sort({ createdAt: 1 }); // old → new

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;


