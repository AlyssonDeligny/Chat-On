import React, { useState } from 'react';
import './styles/App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');

  return (
    <>
      <div className="image-container">
        <img className="cat-picture" src="/frontend/src/assets/images/cat-picture.jpg" alt="cat" />
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

export default App;
