const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema ({
    category_name: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    
},{
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)