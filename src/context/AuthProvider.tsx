'use client';
import { useUser } from '@clerk/nextjs';
import useAuthState from '@components/hooks/useAuthState';
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

   const createUser = async () => {
      const response = await fetch('/api/users', {
         method: 'POST',
         body: JSON.stringify({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            userName: user?.username,
            imageUrl: user?.imageUrl,
            userId: user?.id,
         }),
      });

      if (response.ok) {
         console.log('Saved');
      }
   };

   useEffect(() => {
      // createUser();
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
