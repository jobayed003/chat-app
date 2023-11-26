import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuthState = () => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userDetails, setUserDetails] = useState();
   const router = useRouter();

   useEffect(() => {
      // onAuthStateChanged(auth, async (user) => {
      //    if (user) {
      //       setIsAuthenticated(true);
      //    } else {
      //    }
      // });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { isAuthenticated, userDetails };
};

export default useAuthState;
