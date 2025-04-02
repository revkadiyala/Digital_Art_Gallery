const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const artistSchema = new Schema({
    user_FullName: {
        type: String,
        required: [true, "please enter user full name"],
    },
    user_Email: {
        type: String,
        required: [true, "please enter email"],
    },
    country_code:{
        type: String,
  
    },
    mobile_no:{
        type: String,
        required: [true, "please enter mobile_no"],
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Artist", artistSchema)

