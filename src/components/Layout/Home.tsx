'use client';

import NavBar from '@components/Layout/Navbar';
import Hero from './Hero';

const Home = () => {
   return (
      <>
         <NavBar />
         <Hero />
      </>
   );
};

export default Home;

/* <Link href={'/about'}>
            <Button>Go to about</Button>
         </Link>
         <Link href={'/dashboard/messages'}>
            <Button>Go to dashboard</Button>
         </Link> */
