'use client';

import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SideBar from '../components/UI/SideBar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns={'1fr 2fr 3fr'} bg={'#034'}>
      <GridItem h='100vh' borderRight={'1px solid #eee'}>
        <SideBar />
      </GridItem>
      {children}
    </Grid>
  );
};

export default RootLayout;
