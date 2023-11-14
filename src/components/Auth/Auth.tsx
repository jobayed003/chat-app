'use client';

import { Box, Flex } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { usePathname } from 'next/navigation';

import { AiFillMessage } from 'react-icons/ai';
import Login from './Login';
import Signup from './Signup';

type Props = {};

const Auth = (props: Props) => {
   const path = usePathname().replace('/auth/', '');

   return (
      <Flex justify={'center'} align={'center'} h={'100vh'}>
         <Flex
            bgColor={'bgWhite'}
            direction={'column'}
            minW={'20%'}
            p='1rem'
            borderRadius={'20px'}
            gap={'3rem'}
            overflow={'hidden'}
            position={'relative'}
         >
            <Box alignSelf={'center'}>
               <DynamicText value={'chatIT'} color={'blue'} fontSize={'1.5rem'} mb='3rem' />
               <AiFillMessage color='blue' fontSize={'5rem'} />
            </Box>
            {path === 'login' ? <Login url={path} /> : <Signup url={path} />}
         </Flex>
      </Flex>
   );
};

export default Auth;
