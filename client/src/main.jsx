import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from '../js/store.js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from  '../js/reportWebVitals.js';
// import { ModalProvider } from "react-modal-hook";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider>
        <Router>
          <App/>
        </Router>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();


