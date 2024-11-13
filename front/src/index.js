import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App2 from './App2';
import App from './App';
import Setting from './view/Setting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App2 /> */}
    <App />
    {/* <Setting/> */}
  </React.StrictMode>
);

