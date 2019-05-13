const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//DB connection
const db = require('./server/config/keys').DATABASE;
mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to mongoDB Atlas')
  })
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

//Routes
const bookings = require('./server/routes/bookings');
const rentals = require('./server/routes/rentals');
const users = require('./server/routes/users');

// Use Routes
app.use('/api/bookings', bookings);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

// middleware
// app.use(bodyParser.urlencoded({
//   extended: false
// }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`I'm running on port ${PORT}`);
})