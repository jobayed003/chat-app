'use client';

import { Grid, GridItem } from '@chakra-ui/react';

import { AppContextProvider } from '@context/StateProvider';
import SideBar from '../UI/SideBar';

const Dashboard = ({ children }: ChildrenType) => {
   return (
      <AppContextProvider>
         <Grid templateColumns={{ md: '.5fr 1.5fr 3fr', base: 'max-content 3fr' }}>
            <GridItem h='100vh' display={{ md: 'block', base: 'none' }}>
               <SideBar />
            </GridItem>
            {children}
         </Grid>
      </AppContextProvider>
   );
};

export default Dashboard;
