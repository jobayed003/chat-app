'use client';

import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
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
