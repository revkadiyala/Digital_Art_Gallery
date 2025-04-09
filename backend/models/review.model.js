const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  artId: { type: mongoose.Schema.Types.ObjectId, ref: "Art", required: true },
  buyArtId: { type: mongoose.Schema.Types.ObjectId, ref: "buyArt", required: true }, // ✅ Added booking reference
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);