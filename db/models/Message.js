//Message Model
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  message: String,
  created: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}) 
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;