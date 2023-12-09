'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type ContextType = {
   users: CurrentUser[];

   setUsers: Dispatch<SetStateAction<[]>>;
};

const initContextType: ContextType = {
   users: [],

   setUsers: () => [],
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [users, setUsers] = useState<[]>([]);

   const contextValue = {
      users,

      setUsers,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
