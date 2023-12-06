import { useUser } from '@clerk/nextjs';
import { useMemo } from 'react';

const useAuthState = () => {
   const { isLoaded, isSignedIn, user } = useUser();

   const currentUser = useMemo(() => {
      if (isLoaded && isSignedIn) {
         return user;
      }
   }, [isLoaded, isSignedIn, user]);

   return currentUser;
};

export default useAuthState;
