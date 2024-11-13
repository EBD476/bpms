import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Setting from './view/Setting';
import { GlobalContext } from './GlobalStore';


function App2() {
  return (
    <GlobalContext>
      <Router>
        <Routes>
            <Route path="/" element={<Setting/>} />                    
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App2;