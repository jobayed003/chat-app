'use client';

import { Grid, GridItem } from '@chakra-ui/react';
import { AppContextProvider } from '@context/StateProvider';
import React from 'react';
import SideBar from '../../components/UI/SideBar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <Grid templateColumns={'.8fr 1.5fr 3fr'}>
         <AppContextProvider>
            <GridItem h='100vh'>
               <SideBar />
            </GridItem>
            {children}
         </AppContextProvider>
      </Grid>
   );
};

export default RootLayout;
