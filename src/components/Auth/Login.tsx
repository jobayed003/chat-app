'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { inputStyles } from '@config/data';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const Login = ({ url }: { url: string }) => {
   return (
      <>
         <Stack my='2rem' zIndex={'11'} gap={'1rem'}>
            <InputGroup>
               <Input sx={inputStyles} placeholder='Email Address' />
               <InputLeftElement fontSize='1rem'>
                  <AiOutlineMail color='#aaa' cursor={'pointer'} />
               </InputLeftElement>
            </InputGroup>
            <InputGroup>
               <Input sx={inputStyles} placeholder='Password' />
               <InputLeftElement fontSize='1rem'>
                  <AiOutlineLock color='#aaa' cursor={'pointer'} />
               </InputLeftElement>
            </InputGroup>
         </Stack>

         <Button
            borderRadius={'20px'}
            bg={'#0B294D'}
            color={'#fff'}
            alignSelf={'center'}
            px='3rem'
            py='.5rem'
            _hover={{ color: '#aaa', bg: '#2D3748' }}
         >
            Login
         </Button>

         <Flex justify={'center'} gap='.5rem'>
            <DynamicText value={'New to chatIT?'} color='light' />
            <Link href={`/auth/${url === 'login' ? 'signup' : url}`} color='blue'>
               Register Here
            </Link>
         </Flex>
      </>
   );
};

export default Login;
