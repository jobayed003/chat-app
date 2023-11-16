'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import Inputs from '@components/util/Inputs';
import { inputStyles } from '@config/data';
import { app } from '@firebase/config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

const Signup = ({ url }: { url: string }) => {
   const [userCred, setUserCred] = useState({ name: '', email: '', password: '', profilePicture: '' });
   const router = useRouter();
   const auth = getAuth(app);

   const handleSubmit = async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, userCred.email, userCred.password);
      const user = userCredential.user;
      router.push('/dashboard/messages');
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };
   return (
      <>
         <Stack my='2rem' zIndex={'11'} gap={'1rem'}>
            <InputGroup>
               <Input
                  sx={inputStyles}
                  placeholder='Full Name'
                  value={userCred.name}
                  onChange={handleChange}
                  id={'name'}
               />
               <InputLeftElement fontSize='1rem'>
                  <AiOutlineUser color='#aaa' cursor={'pointer'} />
               </InputLeftElement>
            </InputGroup>
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
            _hover={{ color: '#aaa', bg: '#2D3748' }}
            onClick={handleSubmit}
         >
            Register
         </Button>

         <Flex justify={'center'} gap='.5rem'>
            <DynamicText value={'Already Have an Account?'} color='graytext' />
            <Link href={`/auth/${url === 'signup' ? 'login' : url}`} color='blue'>
               Login Here
            </Link>
         </Flex>
      </>
   );
};

export default Signup;
