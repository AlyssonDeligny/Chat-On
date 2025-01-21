import React, { useEffect, useState } from 'react';
import './styles/App.css';
import catPicture from './assets/images/cat-picture.jpg';
import { io, Socket } from 'socket.io-client';
import MessageInput from './components/MessageInput.tsx';
import Messages from './components/Messages.tsx';

const App: React.FC = () => {
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

  // const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');

  return (
    <>
      <MessageInput send = {send}/>
      <Messages messages = {messages}/>
    </>
  );
};

export default App;


/*<>
  <div className="image-container">
    <img className="cat-picture" src={catPicture} alt="cat" />
  </div>
  <div className="connexion-container">
    <div className="tab-container">
      <button
        className={`tab ${activeTab === 'connexion' ? 'active' : ''}`}
        onClick={() => setActiveTab('connexion')}
      >
        Connexion
      </button>
      <button
        className={`tab ${activeTab === 'inscription' ? 'active' : ''}`}
        onClick={() => setActiveTab('inscription')}
      >
        Inscription
      </button>
    </div>

    <form className="form">
      {activeTab === 'connexion' && (
        <>
          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" id="pseudo" placeholder="Entrez votre pseudo" />
          <button className="submit-button">Se connecter</button>

        </>
      )}

      {activeTab === 'inscription' && (
        <>
          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" id="pseudo" placeholder="Entrez votre pseudo" />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Entrez votre mot de passe" />
          <button className="submit-button">S'inscrire</button>

        </>
      )}
    </form>
  </div>
</>
*/