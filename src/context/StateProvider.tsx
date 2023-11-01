'use client';

import { redirect } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

type ContextType = {
   clicked: boolean;
   isAuthenticated: boolean;
};

const initContextType: ContextType = {
   clicked: true,
   isAuthenticated: false,
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [clicked, setClicked] = useState<boolean>(false);
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

   useEffect(() => {
      if (!isAuthenticated) redirect('/auth/login');
   }, []);

   const contextValue = {
      clicked,
      isAuthenticated,
      setClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export default AppContext;
