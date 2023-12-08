import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import Footer from '@components/Home/Footer';
import NavBar from '@components/Home/Navbar';
import { redirect } from 'next/navigation';
import Feature from './Feature';
import Hero from './Hero';

const Home = async () => {
   const { id } = (await currentUser()) as User;

   if (id) redirect('/dashboard/messages');

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
