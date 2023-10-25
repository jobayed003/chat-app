'use client';

import { createContext, useState } from 'react';

const AppContext = createContext({});

export const AppStore = ({ children }) => {
   const [clicked, setClicked] = useState(false);

   const contextValue = {
      clicked,
      setClicked,
   };
   return <AppContext.Provider value={{ contextValue }}>{children}</AppContext.Provider>;
};
