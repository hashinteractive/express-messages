const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/messages', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.log.bind(console, 'Connected to MongoDB'))

module.exports = db
