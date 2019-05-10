const express = require('express');
const mongoose = require('mongoose');
const fakedb = require('./server/models/fakeDB');

const app = express();

//Routes
const rentals = require('./server/routes/rentals');

// Use Routes
app.use('/api/rentals',rentals);



//DB connection
const db = require('./server/config/keys').database;
mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to mongoDB Atlas')
    new fakedb().seedDB();
  })
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`I'm running on port ${PORT}`);
})