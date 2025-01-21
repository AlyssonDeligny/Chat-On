import React, { useEffect, useState } from 'react';
import catPicture from '../assets/images/cat-picture.jpg';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');

  return (
    <>
      <nav style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
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
  );
};

export default HomePage;
