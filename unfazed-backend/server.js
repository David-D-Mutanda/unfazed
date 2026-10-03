
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Appointment = require("./models/appointment");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Unfazed API!" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Unfazed backend is healthy",
  });
});

// Create an appointment request
app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      preferredDate,
      message,
    } = req.body;

    if (
      typeof patientName !== "string" ||
      !patientName.trim() ||
      typeof patientEmail !== "string" ||
      !patientEmail.trim() ||
      !preferredDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and preferred date are required.",
      });
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      patientEmail.trim()
    );

    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const date = new Date(preferredDate);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid preferred date.",
      });
    }

    const appointment = await Appointment.create({
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      preferredDate: date,
      message:
        typeof message === "string" ? message.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Appointment request submitted successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Appointment creation failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit appointment request.",
    });
  }
});

// Get all appointment requests
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Failed to fetch appointments:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch appointments.",
    });
  }
});

// Approve or reject an appointment request
app.patch("/api/appointments/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID.",
      });
    }

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved, rejected, or pending.",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    return res.json({
      success: true,
      message: "Appointment status updated successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Status update failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update appointment status.",
    });
  }
});

// Start the server after connecting to MongoDB
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Unfazed API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();