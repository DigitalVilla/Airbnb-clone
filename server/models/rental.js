const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: 'Please enter the title',
    max: [80, 'Title length must be within 80 characters']
  },
  address: {
    type: String,
    required: 'Please enter the address',
  },
  country: {
    type: String,
    required: 'Please enter the country',
    lowercase: true
  },
  state: {
    type: String,
    required: 'Please enter the state or province',
    lowercase: true
  },
  city: {
    type: String,
    required: 'Please enter the city',
    lowercase: true
  },
  postalCode: {
    type: String,
    required: 'Please enter the postal code',
  },
  category: {
    type: String,
    required: 'Please select a category',
    lowercase: true
  },
  image: {
    type: String,
    required: 'Please upload an image'
  },
  bedrooms: Number,
  shared: Boolean,
  description: {
    type: String,
    required: 'Please add a description'
  },
  dailyRate: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Rental', rentalSchema);