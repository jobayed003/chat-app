'use client';
import { useUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type ContextType = {
   users: [CurrentUser];

   setUsers: Dispatch<SetStateAction<[]>>;
};

const initContextType: ContextType = {
   // @ts-expect-error
   users: [],

   setUsers: () => [],
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [users, setUsers] = useState<[]>([]);
   const { user } = useUser();

   useEffect(() => {
      const fetchUsers = async () => {
         const response = await fetch('/api/users');

         const users = await response.json();
         setUsers(users);
      };

      user && fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);
   const contextValue = {
      users,

      setUsers,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
