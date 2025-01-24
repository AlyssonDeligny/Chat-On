import React, { useEffect, useState } from 'react';
// @ts-ignore
import catPicture from '../assets/images/cat-picture.jpg';
import { Link } from 'react-router-dom';
import { registerUser, loginUser } from '../api/api';

const HomePage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');
  const [user, setUser] = useState({ pseudo: '', email: '', password: '' });
  const [message, setMessage] = useState<string>('');

  // 🔥 Fonction pour gérer les changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // 🔥 Fonction pour gérer l'inscription
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(user);
      setMessage('Inscription réussie ! ✅');
      console.log('Inscription réussie:', response);
    } catch (error) {
      setMessage('Erreur lors de l’inscription ❌');
    }
  };

  // 🔥 Fonction pour gérer la connexion
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: user.email, password: user.password });
      setMessage('Connexion réussie ! ✅ Token reçu');
      console.log('Token:', response.access_token);
    } catch (error) {
      setMessage('Erreur lors de la connexion ❌');
    }
  };


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

        <form className="form" onSubmit={activeTab === 'connexion' ? handleLogin : handleRegister}>
          {activeTab === 'connexion' && (
            <>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Entrez votre email" onChange={handleChange} />
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" onChange={handleChange} />
              <button className="submit-button" type="submit">Se connecter</button>
            </>
          )}

          {activeTab === 'inscription' && (
            <>
              <label htmlFor="pseudo">Pseudo</label>
              <input type="text" id="pseudo" name="pseudo" placeholder="Entrez votre pseudo" onChange={handleChange} />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Entrez votre email" onChange={handleChange} />
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" onChange={handleChange} />
              <button className="submit-button" type="submit">S'inscrire</button>
            </>
          )}
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default HomePage;
