const path = require('path')
const express = require('express');
const app = express();
const db = require('./db/config');
const { Message, User } = require('./db/models')

app.use(express.static(path.join(__dirname, 'client/dist')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** User Routes **/
app.post('/api/users', (req, res, next) => {
  const { body: user } = req
  userInstance = new User(user)
  userInstance.save((err, u) => {
    if(err){
      next(err)
    }else{
      res.status(201).json(u)
    }
  })
})

app.get('/api/users', (req, res, next) => {
  User.find((err, users) => {
    if(err){
      next(err)
    }else{
      res.status(200).json(users)
    }
  })
})

app.get('/api/users/:id', async (req, res, next) => {
  const { params: { id } } = req
  try{
    const user = await User.findOne({ _id: id })
    const messages = await Promise.all(user.messages.map(m =>
      Message.findById(m._id)
    ))
    user.messages = messages
    res.status(200).json(user)
  }catch(err){
    next(err)
  }
})

/** Message Routes **/
app.get('/api/messages', async (req, res, next) => {
  try{
    let allMessages = await Message.find()
    let messages = await Promise.all(allMessages.map(m => new Promise(async (resolve, reject) => {
      let user = await User.findById(m.user)
      m.user = user
      resolve(m)
    }) ))
    res.status(200).json(messages)
  }catch(err){
    next(err)
  }
})

app.post('/api/messages', async (req, res, next) => {
  const { body: message } = req
  let messageInstance = new Message(message)
  try{
    const message = await messageInstance.save()
    const user = await User.findOneAndUpdate({ _id: message.user._id }, { $push: { messages: message._id } }, { new: true })
    message.user = user
    res.status(201).json(message)
  }catch(err){
    next(err)
  }
})

app.get('/api/messages/:id', async (req, res, next) => {
  const { params: { id } } = req
  try{
    const message = await Message.findById(id)
    const user = await User.findById(message.user._id)
    message.user = user
    res.status(200).json(message)
  }catch(err){
    next(err)
  }
})

app.patch('/api/messages/:id', (req, res, next) => {
  const { body: message, params: { id } } = req
  Message.findOneAndUpdate({ _id: id }, message, { new: true }, (err, m) => {
    if(err){
      next(err)
    }else{
      res.status(200).json(m)
    }
  })
})

app.delete('/api/messages/:id', async (req, res, next) => {
  const { params: { id } } = req
  try{
    await Message.findByIdAndDelete(id)
    //update the messages array on user
    let user = await User.findOneAndUpdate({ messages: { $in: [id] } }, { $pull: { messages: id } }, { new: true })
    res.status(200).json(user)
  }catch(err){
    next(err)
  }
})

//fallback route
app.use((req,res,next) => {
  res.status(404).send('That route does not exist');
});

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
