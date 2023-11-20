import { auth } from '@firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuthState = () => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [userDetails, setUserDetails] = useState({ name: '', email: '', profilePic: '' });
   const router = useRouter();

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            setIsAuthenticated(true);
            // const userData = await fetchData('users', user.uid);

            // setUserDetails({ name: userData.name, email: userData.email, profilePic: userData.profilePic });
            // router.push('/dashboard/messages');
         } else {
            // router.push('/auth/signup');
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { isAuthenticated, userDetails };
};

export default useAuthState;
