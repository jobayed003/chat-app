'use client';
import { useUser } from '@clerk/nextjs';
import useAuthState from '@hooks/useAuthState';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type ContextType = {
   isAuthenticated: boolean;
   users: [];
   userDetails: {
      name: string;
      email: string;
      profilePic: string;
   };

   setUsers: Dispatch<SetStateAction<[]>>;
};

const initContextType: ContextType = {
   isAuthenticated: false,
   users: [],
   userDetails: {
      name: '',
      email: '',
      profilePic: '',
   },
   setUsers: () => [],
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const { isAuthenticated, userDetails } = useAuthState();
   const [users, setUsers] = useState<[]>([]);
   const { user } = useUser();

   useEffect(() => {
      const fetchUsers = async () => {
         const response = await fetch('/api/users');

         const users = await response.json();
         setUsers(users.filter((el: any) => el.id !== user?.id));
      };

      user && fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);
   const contextValue = {
      users,
      userDetails,
      isAuthenticated,

      setUsers,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
