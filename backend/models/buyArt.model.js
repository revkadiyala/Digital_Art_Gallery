const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyArtSchema = new Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  art_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Art',
    required: true
  },
  cardDetails: {
    cardNumber: { type: String, trim: true },
    expiryMonth: { type: String, trim: true },
    expiryYear: { type: String, trim: true },
    cardHolderName: { type: String, trim: true }
  },
  price: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'Completed'
  },
  deleteFlag: {
    type: Boolean,
    default: false
}
}, {
timestamps: true
});

module.exports = mongoose.model('buyArt', buyArtSchema);