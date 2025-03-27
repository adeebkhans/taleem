const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    images: [{ type: String }], // Event image URLs
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users attending
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Event comments
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
