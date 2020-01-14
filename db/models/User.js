const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  messages: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User