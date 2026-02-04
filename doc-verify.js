// server.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


   // "mongodb+srv://GarvKumar:GarvKumarServer@cluster0.ptxxm7y.mongodb.net/memberDB"



// Schema for document verification (only documentId)
const verificationSchema = new mongoose.Schema({
    documentId: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const Verification = mongoose.model("Verification", verificationSchema);

// API endpoint to save only document ID
router.post("/verify-doc", async (req, res) => {
    try {
        const { documentId } = req.body;

        if (!documentId) {
            return res.status(400).json({ message: "Document ID is required." });
        }

        const newVerification = new Verification({ documentId });
        await newVerification.save();

        res.json({ message: "✅ Document ID saved successfully!" });
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;