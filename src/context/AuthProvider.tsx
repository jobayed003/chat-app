'use client';
import { app } from '@firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type ContextType = {
   isAuthenticated: boolean;

   userDetails: {
      name?: string | null | undefined;
      email: string | null | undefined;
      password: string | null | undefined;
      profilePic?: string | null | undefined;
   };

   setUserDetails: Dispatch<
      SetStateAction<{
         name?: string | null;
         email: string | null;
         password?: string;
         profilePic?: string | null;
      }>
   >;
};

const initContextType: ContextType = {
   isAuthenticated: false,

   userDetails: {
      name: '',
      email: '',
      password: '',
      profilePic: '',
   },
   setUserDetails: () => {},
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '', profilePic: '' });
   const auth = getAuth(app);
   const router = useRouter();

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         if (!user) {
            router.push('/auth/signup');
            return;
         } else {
            setIsAuthenticated(true);
            router.push('/dashboard/messages');
         }
      });
   }, []);

   const contextValue = {
      userDetails,
      isAuthenticated,

      setUserDetails,
      setIsAuthenticated,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children} </AuthContext.Provider>;
};

export default AuthContext;
