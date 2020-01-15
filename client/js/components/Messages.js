import React from 'react'
import Message from './Message'

const Messages = (props) => {
  return(
    <ul>
      { props.messages.map(m => <Message key={m._id} message={m} />)}
    </ul>
  )
}

export default Messages