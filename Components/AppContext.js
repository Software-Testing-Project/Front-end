import React from "react";

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext); // the custom hook
export default AppContext;
