'use client';
import { Flex, Spinner } from '@chakra-ui/react';

type Props = {};

const loading = (props: Props) => {
   return (
      <Flex justify={'center'} align={'center'} height={'100vh'}>
         <Spinner size='xl' />
      </Flex>
   );
};

export default loading;
