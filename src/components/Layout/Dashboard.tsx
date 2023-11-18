'use client';

import { Grid, GridItem } from '@chakra-ui/react';

import { AppContextProvider } from '@context/StateProvider';
import React from 'react';
import SideBar from '../UI/SideBar';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
   return (
      <AppContextProvider>
         <Grid templateColumns={'.8fr 1.5fr 3fr'}>
            <GridItem h='100vh'>
               <SideBar />
            </GridItem>
            {children}
         </Grid>
      </AppContextProvider>
   );
};

export default Dashboard;
