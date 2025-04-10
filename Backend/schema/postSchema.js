const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Linked comments
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Author
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
