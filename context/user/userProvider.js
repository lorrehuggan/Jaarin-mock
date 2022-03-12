import React, { createContext, useContext, useReducer } from 'react';

export const UserContext = createContext();
//TODO Refactor to TypeScript

export const UserProvider = ({ initialState, reducer, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);

export const useUserState = () => useContext(UserContext);
