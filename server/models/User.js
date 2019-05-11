const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: 'This email is already registered}',
    lowercase: true,
    required: 'Email is required',
    max: [60, 'Email must be between 4 and 32 characters'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  username: {
    type: String,
    unique: 'This username is already taken',
    required: 'Username is required',
    min: [4, 'Username must be between 4 and 20 characters'],
    max: [32, 'Username must be between 4 and 20 characters']
  },
  password: {
    type: String,
    required: 'Password is required',
    min: [4, 'Password must be between 4 and 32 characters'],
    max: [32, 'Password must be between 4 and 32 characters']
  },
  rentals: [{
    type: Schema.Types.ObjectId,
    ref: 'Rental'
  }],
  avatar: {type: String}
});

module.exports = mongoose.model('User', userSchema)