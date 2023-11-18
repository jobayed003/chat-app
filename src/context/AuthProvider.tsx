'use client';
import { auth } from '@firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

type ContextType = {
   isAuthenticated: boolean;

   userDetails: {
      name: string;
      email: string;
      profilePic: string;
   };

   setUserDetails: Dispatch<
      SetStateAction<{
         name: string;
         email: string;
         profilePic: string;
      }>
   >;
};

const initContextType: ContextType = {
   isAuthenticated: false,

   userDetails: {
      name: '',
      email: '',
      profilePic: '',
   },
   setUserDetails: () => {},
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userDetails, setUserDetails] = useState({ name: '', email: '', profilePic: '' });
   const router = useRouter();

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         if (!user) {
            router.push('/auth/signup');
            return;
         } else {
            setIsAuthenticated(true);

            setUserDetails({ name: user.displayName!, email: user.email!, profilePic: user.photoURL || '' });
            router.push('/dashboard/messages');
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const contextValue = {
      userDetails,
      isAuthenticated,

      setUserDetails,
      setIsAuthenticated,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
