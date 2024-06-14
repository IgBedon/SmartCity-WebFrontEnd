import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';


import Routes from './Routes'; // Importando como default export

function App() {

  return (
    <>
      {/* Arquivo com as rotas do projeto */}

      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
      
    </>
  );

}

export default App;
