'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import Footer from '@components/Home/Footer';
import NavBar from '@components/Home/Navbar';
import { redirect } from 'next/navigation';
import Feature from './Feature';
import Hero from './Hero';

const Home = () => {
   const { isSignedIn } = useUser();
   // const } = auth ()

   const { handleRedirectCallback } = useClerk();

   if (isSignedIn) redirect('/dashboard/messages');

   return (
      <>
         <NavBar />
         <Hero />
         <Feature />
         <Footer />
      </>
   );
};

export default Home;
