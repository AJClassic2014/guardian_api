import React from 'react';
import logo from './logo.svg';
import './App.css';

const LoadingPage = () => (
  <div style={{ color: '#000000', textAlign: 'center' }}>
    <img src={logo} className="App-logo" alt="logo" />
    <div style={{ color: '#ea4335', margin: 'auto' }}>Loading...</div>
  </div>
);

export default LoadingPage;