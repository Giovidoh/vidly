const mongoose = require('mongoose');

// Connection to DB
const connection = mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to DB...'))
    .catch((err) => console.log('Could not connect to MongoDB...', err));

module.exports = connection;