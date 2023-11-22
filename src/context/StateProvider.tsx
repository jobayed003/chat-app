'use client';

import { createContext, useEffect, useState } from 'react';

type ContextType = {
   clicked: boolean;
};

const initContextType: ContextType = {
   clicked: true,
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [clicked, setClicked] = useState<boolean>(false);

   useEffect(() => {}, []);

   const contextValue = {
      clicked,
      setClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export default AppContext;
