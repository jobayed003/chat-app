'use client';

import { Button } from '@chakra-ui/react';
import AppContext from '@context/StateProvider';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useContext } from 'react';

const Home = () => {
   const { isAuthenticated } = useContext(AppContext);

   if (!isAuthenticated) redirect('/auth/login');

   return (
      <>
         <Link href={'/about'}>
            <Button>Go to about</Button>
         </Link>
         <Link href={'/dashboard/messages'}>
            <Button>Go to dashboard</Button>
         </Link>
         {/* <Link href={'/dashboard/messages'}>
        <Button>Go to dashboard</Button>
      </Link> */}
      </>
   );
};

export default Home;
