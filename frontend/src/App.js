import React from 'react';
import './App.css'; // Importation du fichier de style global
import IdentityCard from './components/IdentityCard'; // Importation du composant de la carte d'identité
import GenerationButton from './components/GenerationButton';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <IdentityCard 
          firstName="Jean" 
          lastName="Dupont" 
          birthDate="01/01/1970"
          birthPlace="Paris"
          gender="M"
          UUID="32Y3RRE"
        />
        <GenerationButton
        />
      </main>
    </div>
  );
}

export default App;
