import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MessageInput from '../components/MessageInput.tsx';
import Messages from '../components/Messages.tsx';
import { Link } from 'react-router-dom';

const Chat: React.FC = () => {

  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])

  const send = (value :string) => {
    socket?.emit("message", value)
  }
  useEffect(()=> {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: string) => {
    setMessages([...messages, message])
  }

  useEffect(()=> {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])


  return (
    <>
      <nav >
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </nav>
      <div className="chat-container">
        <h1>Chat</h1>
        <div className="message-input">
          <MessageInput send={send} />
        </div>
        <div className="messages">
          <Messages messages={messages} />
        </div>
      </div>
    </>
  )
}

export default Chat;
