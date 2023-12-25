'use client';
import { GridItem } from '@chakra-ui/react';
import Spinners from '@components/UI/Spinners';

const loading = () => {
   return (
      <GridItem height={'100vh'} display={{ base: 'none', md: 'block' }}>
         <Spinners />
      </GridItem>
   );
};

export default loading;
