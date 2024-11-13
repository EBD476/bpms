import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const GlobalContext = ({ children }) => {
  const [state, setState] = useState({ user: null });

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};