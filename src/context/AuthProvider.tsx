'use client';
import useAuthState from '@components/hooks/useAuthState';
import { createContext, useEffect } from 'react';

type ContextType = {
   isAuthenticated: boolean;
   userDetails: {
      name: string;
      email: string;
      profilePic: string;
   };

   // setUserDetails: Dispatch<
   //    SetStateAction<{
   //       name: string;
   //       email: string;
   //       profilePic: string;
   //    }>
   // >;
};

const initContextType: ContextType = {
   isAuthenticated: false,
   userDetails: {
      name: '',
      email: '',
      profilePic: '',
   },
};

const AuthContext = createContext<ContextType>(initContextType);

export const AuthContextProvider = ({ children }: ChildrenType) => {
   const { isAuthenticated, userDetails } = useAuthState();

   useEffect(() => {
      const fetchUser = async () => {
         // const user = await currentUser();
         // console.log(user);
         // await fetchData('users', auth.currentUser?.uid);
      };
      fetchUser();
   }, []);

   const contextValue = {
      userDetails,
      isAuthenticated,
   };
   // @ts-ignore
   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
