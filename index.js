const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ops = require('./server/controllers/seedDB')

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
    // new ops().seedDB();
  })
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

//Routes
const bookings = require('./server/routes/apis/bookings');
const rentals = require('./server/routes/apis/rentals');
const users = require('./server/routes/apis/users');

// Use Routes
app.use('/api/bookings', bookings);
app.use('/api/rentals', rentals);
app.use('/api/users', users);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`I'm running on port ${PORT}`);
})