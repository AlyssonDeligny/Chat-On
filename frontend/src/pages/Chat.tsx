import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
import { Link } from 'react-router-dom';

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Fonction pour envoyer un message via le socket
  const send = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);

    // Nettoyage : Fermer la connexion socket lors du démontage du composant
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const messageListener = (message: string) => {
      setMessages(prev => [...prev, message]); // ✅ Utilisation de `prev` pour éviter les pertes de messages
    };

    socket.on('message', messageListener);

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  return (
    <>
      <nav>
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
  );
};

export default Chat;
