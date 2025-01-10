import React, { useState }  from 'react';
import './App.css';

const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');

  return (
    <>
      <div className="image-container">
        <img
          className="cat-picture"
          src="/cat-picture.jpg"
          alt="cat"
        />
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
              <label htmlFor="nickname">Pseudo</label>
              <input type="text" id="nickname" placeholder="Entrez votre pseudo" />
            </>
          )}

          {activeTab === 'inscription' && (
            <>
              <label htmlFor="nickname">Pseudo</label>
              <input type="text" id="nickname" placeholder="Entrez votre pseudo" />
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" placeholder="Entrez votre mot de passe" />
            </>
          )}
        </form>
              </div>
    </>
  );
};

export default App;
