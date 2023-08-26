import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import Navbar from './features/navbar/Navbar';
import Footer from './features/footer/Footer';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
