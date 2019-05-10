const express = require('express');
const mogoose = require('mongoose');


//DB connection
const db = require('./server/config/keys').database;
mongoose.connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
})

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`I'm running on port ${PORT}`);
})