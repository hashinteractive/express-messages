import React from 'react'

const Message = ({message}) => {
  return(
    <li>
      <strong>{ message.user.username }:</strong> <span>{ message.message }</span>
    </li>
  )
}

export default Message