const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Enter a valid email'],
    unique: [true, 'That email is already registered}'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email']
  },
  username: {
    type: String,
    required: [true, 'Enter a unique username'],
    unique: [true, 'That username is already taken']
  },
  password: {
    type: String,
    required: [true, 'Enter a unique password']
  },
  rentals: [{
    type: Schema.Types.ObjectId,
    ref: 'Rental'
  }],
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema)