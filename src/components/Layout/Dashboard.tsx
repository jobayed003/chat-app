'use client';

import { Grid, GridItem } from '@chakra-ui/react';

import Ringer from '@components/UI/Ringer';
import { AppContextProvider } from '@context/StateProvider';
import { useParams } from 'next/navigation';
import SideBar from '../UI/SideBar';
import { useUser } from '@clerk/nextjs';

const Dashboard = ({ children }: ChildrenType) => {
   // @ts-ignore
   const { conversationId } = useParams();

   return (
      <AppContextProvider>
         <Grid templateColumns={{ md: '.5fr 1.5fr 3fr', base: `${conversationId ? '3fr' : '1fr'}` }}>
            <GridItem h='100vh' display={{ md: 'block', base: 'none' }}>
               <SideBar />
            </GridItem>
            {children}
         </Grid>

         <Ringer />
      </AppContextProvider>
   );
};

export default Dashboard;
