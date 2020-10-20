import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes/index';
import history from './history';
import './assets/styles/global.css';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>    
  )
}

export default App;
