'use client';

import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type ContextType = {
   isAuthenticated: boolean;
   userDetails: { name: string; email: string; password: string };
   setUserDetails: Dispatch<
      SetStateAction<{
         name: string;
         email: string;
         password: string;
      }>
   >;
};

const initContextType: ContextType = {
   isAuthenticated: false,
   userDetails: {
      name: '',
      email: '',
      password: '',
   },
   setUserDetails: () => {},
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '' });

   useEffect(() => {}, []);

   const contextValue = {
      userDetails,
      isAuthenticated,

      setUserDetails,
   };
   return <AuthContext.Provider value={contextValue}>{children} </AuthContext.Provider>;
};

export default AuthContext;
