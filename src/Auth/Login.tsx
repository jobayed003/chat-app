'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import Inputs from '@components/util/Inputs';
import { inputStyles } from '@config/data';
import { auth } from '@firebase/config';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { ChangeEvent, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

type LoginProps = {
   url: string;
};

const Login = ({ url }: LoginProps) => {
   const [userCred, setUserCred] = useState({ email: '', password: '' });
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async () => {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, userCred.email, userCred.password);
      router.push('/dashboard/messages');
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setUserCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };

   return (
      <>
         <Stack my='2rem' zIndex={'11'} gap={'1rem'}>
            <InputGroup>
               <Input
                  sx={inputStyles}
                  placeholder='Email Address'
                  value={userCred.email}
                  onChange={handleChange}
                  id={'email'}
               />
               <InputLeftElement fontSize='1rem'>
                  <AiOutlineMail color='#aaa' cursor={'pointer'} />
               </InputLeftElement>
            </InputGroup>
            <Inputs
               value={userCred.password}
               placeholder='Password'
               onChange={handleChange}
               id={'password'}
               type='password'
            />
         </Stack>

         <Button
            borderRadius={'20px'}
            bg={'#0B294D'}
            color={'#fff'}
            alignSelf={'center'}
            px='3rem'
            py='.5rem'
            onClick={handleSubmit}
            isDisabled={Object.values(userCred).includes('')}
            _hover={{ color: '#aaa', bg: '#2D3748' }}
         >
            {isLoading ? 'Loading...' : 'Login'}
         </Button>

         <Flex justify={'center'} gap='.5rem'>
            <DynamicText color='graytext'>New to chatIT?</DynamicText>
            <Link href={`/auth/${url === 'login' ? 'signup' : url}`} color='blue'>
               Register Here
            </Link>
         </Flex>
      </>
   );
};

export default Login;

// https://chatit-e2826.firebaseapp.com/__/auth/handler
