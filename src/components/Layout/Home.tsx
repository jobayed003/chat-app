'use client';

import { useUser } from '@clerk/nextjs';
import Footer from '@components/UI/Footer';
import NavBar from '@components/UI/Navbar';
import { redirect } from 'next/navigation';
import Feature from '../UI/Feature';
import Hero from '../UI/Hero';

const Home = () => {
   const { isLoaded, isSignedIn } = useUser();

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
