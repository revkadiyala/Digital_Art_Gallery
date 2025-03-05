const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const art = new Schema({
    artist_name: {
        type: String,
        required: true
    },
    art_name: {
        type: String,
        required: true
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
   
}, { timestamps: true });

module.exports = mongoose.model("Art", art);