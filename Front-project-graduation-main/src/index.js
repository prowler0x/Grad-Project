import React from 'react';
import ReactDOM from 'react-dom/client';
import {  } from "./style.css";
import {  } from "./Pages/Dashboard/Dashboard";

import App from './app';
import "./Assets/all.min.css"
import { BrowserRouter } from "react-router-dom";
import UserProvider from'./Pages/Website/Context/UserContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <UserProvider> 
    <App/>
  </UserProvider>
    
  </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
