'use client';

import { Box, Flex } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { createUser } from '@firebase/createUser';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { AiFillMessage, AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
   const path = usePathname().replace('/auth/', '');

   return (
      <Flex justify={'center'} align={'center'} h={'100vh'}>
         <Flex
            bgColor={'bgWhite'}
            direction={'column'}
            minW={'20%'}
            p='1rem'
            borderRadius={'20px'}
            gap={'1.5rem'}
            overflow={'hidden'}
            position={'relative'}
         >
            <Box alignSelf={'center'}>
               <DynamicText color={'blue'} fontSize={'1.5rem'} mb='3rem'>
                  chatIT
               </DynamicText>
               <AiFillMessage color='blue' fontSize={'5rem'} />
            </Box>
            {path === 'login' ? <Login url={path} /> : <Signup url={path} />}

            <Box mx='auto'>
               <DynamicText color='graytext'>Or {path.charAt(0).toUpperCase() + path.slice(1)} with</DynamicText>
               <Flex fontSize={'2rem'} justify={'center'} gap='.5rem' mt='.5rem'>
                  <AiOutlineGoogle
                     cursor={'pointer'}
                     onClick={async () => {
                        const provider = new GoogleAuthProvider();
                        await createUser(provider);
                     }}
                  />
                  <AiOutlineGithub
                     cursor={'pointer'}
                     onClick={async () => {
                        const provider = new GithubAuthProvider();
                        await createUser(provider);
                     }}
                  />
               </Flex>
            </Box>
         </Flex>
      </Flex>
   );
};

export default Auth;
