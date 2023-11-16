'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import Inputs from '@components/util/Inputs';
import { inputStyles } from '@config/data';
import { app } from '@firebase/config';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { ChangeEvent, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

const Login = ({ url }: { url: string }) => {
   const [userCred, setUserCred] = useState({ name: '', email: '', password: '', profilePicture: '' });
   const router = useRouter();

   const auth = getAuth(app);

   const handleSubmit = async () => {
      const userCredential = await signInWithEmailAndPassword(auth, userCred.email, userCred.password);
      const user = userCredential.user;
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
            _hover={{ color: '#aaa', bg: '#2D3748' }}
         >
            Login
         </Button>

         <Flex justify={'center'} gap='.5rem'>
            <DynamicText value={'New to chatIT?'} color='graytext' />
            <Link href={`/auth/${url === 'login' ? 'signup' : url}`} color='blue'>
               Register Here
            </Link>
         </Flex>
      </>
   );
};

export default Login;

// https://chatit-e2826.firebaseapp.com/__/auth/handler
