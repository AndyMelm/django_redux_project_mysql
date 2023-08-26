import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Journal from './features/journal/Journal';
import JournalData from './features/showdata/Showdata';
import Tradingview from './features/tradingview/Tradingview';
import HomePage from './features/homepage/HomePage';
import About from './features/footer/About';
import Donations from './features/footer/Donations';
import Tutorial from './features/footer/Tutorial';
import ContactUs from './features/footer/ContactUs';
import CryptoUSDConverter from './features/cryptoUSDconverter/CryptoUSDConverter';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journaldata" element={<JournalData />} />
            <Route path="/marketdata" element={<Tradingview />} />
            <Route path="/cryptousdconvert" element={<CryptoUSDConverter />} />
            <Route path="/about" element={<About />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
