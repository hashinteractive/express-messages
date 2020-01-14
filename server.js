const express = require('express');
const app = express();
const db = require('./db/config');
const { Message, User } = require('./db/models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** User Routes **/

app.get('/api/messages', (req, res, next) => {
  Message.find((err, messages) => {
    if(err){
      next(err)
    }else{
      res.status(200).json(messages)
    }
  })
})

app.post('/api/messages', (req, res, next) => {
  const { body: message } = req
  let messageInstance = new Message(message)
  messageInstance.save((err, m) => {
    if(err){
      next(err)
    }else{
      res.status(201).json(m)
    }
  })
})

app.get('/api/messages/:id', (req, res, next) => {
  const { params: { id } } = req
  Message.findOne({ _id: id }, (err, m) => {
    if(err){
      next(err)
    }else{
      res.status(200).json(m)
    }
  })
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

app.delete('/api/messages/:id', (req, res, next) => {
  const { params: { id } } = req
  Message.findOneAndDelete({ _id: id }, err => {
    if(err){
      next(err)
    }else{
      res.status(200).json({ id })
    }
  }) 
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
