import React, { createContext, useContext, useReducer } from 'react';

export const JobContext = createContext();
//TODO Refactor to TypeScript

export const JobProvider = ({ initialState, reducer, children }) => (
  <JobContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </JobContext.Provider>
);

export const useJobState = () => useContext(JobContext);
