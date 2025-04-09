const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const artSchema = new Schema({
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist", // Reference to Artist model
        required: true
    },
    artist_name: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        enum: ['Admin', 'Vendor'], // Store who added the art
        required: true
    },
    art_name: {
        type: String,
        required: true,
        unique: true // Enforce unique art name
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    photos: {
        type: [String],
        required: [true, "please add photo"]
    },
    status: {
        type: Number,
        enum: [0, 1], // 0 = Inactive, 1 = Active
        default: 0
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Array of user IDs who liked the art
}, { timestamps: true });

module.exports = mongoose.model("Art", artSchema);