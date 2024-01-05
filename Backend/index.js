const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Routes
const userRoutes = require('./routes/user.route');

const app = express();

// config
const config = require('./config');
const PORT = config.PORT;

// app.use
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))
app.use('/api', userRoutes);
app.use(express.static(path.join(__dirname, 'client/build')))



const mongoConnect = async () => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });
    console.log('MONGO DB CONNECTED SUCCESSFULLY!')
  } catch (error) {
    console.log(error);
  }
}

mongoConnect()

app.listen(PORT, () => {
  console.log('SERVER IS RUNNING on ' + PORT)
})


