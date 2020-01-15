import React, { Component } from 'react'
import Messages from './components/Messages'

class App extends Component{
  constructor(){
    super()
    this.fetchMessages = this.fetchMessages.bind(this)
    this.state = {
      messages: []
    }
    this.fetchMessages()
  }
  async fetchMessages(){
    let messages = await fetch('/api/messages').then(res => res.json())
    this.setState({ messages })
  }
  render(){
    return(
      <div className="app">
        <Messages messages={this.state.messages} />
      </div>
    )
  }
}

export default App