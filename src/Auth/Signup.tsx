'use client';

import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { FileInput } from '@components/util/FileInput';
import Inputs from '@components/util/Inputs';
import { inputStyles } from '@config/data';
import AuthContext from '@context/AuthProvider';
import { auth, db } from '@firebase/config';
import { uploadImg } from '@firebase/uploadImg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

const Signup = ({ url }: { url: string }) => {
   const [userCred, setUserCred] = useState({ name: '', email: '', password: '', profilePicture: [] });
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, userCred.email, userCred.password);

      const url = await uploadImg(userCred.profilePicture[0]);
      const { user } = userCredential;

      updateProfile(user, {
         displayName: userCred.name,
         photoURL: url,
      });

      const userCopy = {
         name: userCred.name,
         email: userCred.email,
         profilePic: url,
         timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), {
         ...userCopy,
      });
      router.push('/dashboard/messages');
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };
   const getFileName = async (file: []) => {
      setUserCred((prev) => ({ ...prev, profilePicture: file }));
   };

   return (
      <>
         <Stack zIndex={'11'} gap={'1rem'}>
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
            {/* Drag and Drop File upload */}
            <FileInput getFileName={getFileName} />

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
            isDisabled={Object.values(userCred).includes('') && userCred.profilePicture.length !== undefined}
         >
            {isLoading ? 'Loading...' : 'Register'}
         </Button>

         <Flex justify={'center'} gap='.5rem'>
            <DynamicText color='graytext'>Already Have an Account?</DynamicText>
            <Link href={`/auth/${url === 'signup' ? 'login' : url}`} color='blue'>
               Login Here
            </Link>
         </Flex>
      </>
   );
};

export default Signup;
