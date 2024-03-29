'use client';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type ContextType = {
   currentUser: CurrentUser;

   setCurrentUser: Dispatch<SetStateAction<{}>>;
};

const initUser = { id: '', username: '', firstName: '', lastName: '', imageUrl: '' };
const initContextType: ContextType = {
   currentUser: initUser,

   setCurrentUser: () => {},
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [currentUser, setCurrentUser] = useState<CurrentUser>();

   const contextValue = {
      currentUser,

      setCurrentUser,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
   return useContext(AuthContext);
};
