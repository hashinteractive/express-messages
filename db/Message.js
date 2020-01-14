//Message Model
const mongoose = require('mongoose')
const db = require('./config');

const messageSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  message: String,
}) 
const Message = mongoose.model('Message', messageSchema);


module.exports = Message;
