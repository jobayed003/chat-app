'use client';

import { Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

const Layout = () => {
  return (
    <Grid templateColumns={'1fr 2fr 3fr'} gap={6} p='.2rem'>
      <GridItem h='10' bg='gray.50'>
        <Text>Logo</Text>
      </GridItem>
      <GridItem w='100%' h='10' bg='blue.500'>
        <Text>Messages</Text>
      </GridItem>
      <GridItem w='100%' h='10' bg='gray.500'>
        <Text>Chat Container</Text>
      </GridItem>
    </Grid>
  );
};

export default Layout;
