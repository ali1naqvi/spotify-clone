import React, { createContext, useContext, useReducer } from "react";

//preparing DataLayer
export const DataLayerContext = createContext();

//children is what is wrapped inside DataLayer in index
export const DataLayer = ({ initialState, reducer, children }) => (
    //reducer bc it takes whatever we passed as a prop
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {/*wrap wherever the children are*/}
        {children}
    </DataLayerContext.Provider>
);

//get access from datalayer
//value from datalayer or dispatch an action to it
//useContext is hook 
export const useDataLayerValue = () => useContext(DataLayerContext);