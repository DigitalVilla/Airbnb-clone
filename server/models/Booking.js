const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: {
    type: Date,
    required: "Select a start date"
  },
  endAt: {
    type: Date,
    required: "Select an end date"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rental: {
    type: Schema.Types.ObjectId,
    ref: 'Rental'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  days: Number,
  guests: Number,
  totalPrice: Number,
})

module.exports = mongoose.model('Booking', bookingSchema);