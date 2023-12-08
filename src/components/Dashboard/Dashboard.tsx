'use client';

import { Grid, GridItem } from '@chakra-ui/react';

import Ringer from '@components/UI/Ringer';
import { AppContextProvider } from '@context/StateProvider';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import SideBar from './SideBar';

type DashboardProps = {
   user: CurrentUser;
   children: ReactNode;
};

const Dashboard = (props: DashboardProps) => {
   // @ts-ignore
   const { conversationId } = useParams();

   return (
      <AppContextProvider>
         <Grid templateColumns={{ md: '.5fr 1.5fr 3fr', base: `${conversationId ? '3fr' : '1fr'}` }}>
            <GridItem h='100vh' display={{ md: 'block', base: 'none' }}>
               <SideBar user={props.user} />
            </GridItem>
            {props.children}
         </Grid>

         <Ringer />
      </AppContextProvider>
   );
};

export default Dashboard;
