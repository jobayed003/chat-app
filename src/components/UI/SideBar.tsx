'use client';

import { Box, Button, Flex, Grid, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import { buttonStyles } from '@config/data';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillMessage, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

const SideBar = () => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { signOut } = useAuth();
   const { user } = useUser();
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <Grid templateRows={'100px auto'} borderRight={borderColor} h='100%'>
         <Box borderBottom={borderColor} display={'flex'} fontSize={'2.5rem'} p={'1.5rem'} alignItems={'center'}>
            <AiFillMessage color='blue' />
            <DynamicText marginLeft={'.5rem'}>chatIT</DynamicText>
         </Box>
         <Grid templateRows={'1fr auto'}>
            <Menus />
            <Flex align={'center'} gap='1rem' p='1rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <UserButton />
               </Box>
               <Box>
                  <DynamicText as={'p'} m='0'>
                     {user?.username}
                  </DynamicText>
                  <Link href={'/auth/login'} onClick={() => signOut()}>
                     <DynamicText color={'graytext'} fontSize={'.9rem'}>
                        Logout
                     </DynamicText>
                  </Link>
               </Box>
               <Button ml={'auto'} style={{ ...buttonStyles }} onClick={toggleColorMode}>
                  {colorMode === 'dark' ? (
                     <FaSun fontSize={'1.5rem'} color={'rgb(160, 174, 192)'} />
                  ) : (
                     <FaMoon fontSize={'1.5rem'} color={'rgb(160, 174, 192)'} />
                  )}
               </Button>
            </Flex>
         </Grid>
      </Grid>
   );
};

export default SideBar;

const Menus = () => {
   const pathName = usePathname()?.split('/');
   const router = useRouter();
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   const option = [
      { name: 'Messages', icon: <AiOutlineMessage fontSize={'1.3rem'} /> },
      { name: 'Settings', icon: <AiOutlineSetting fontSize={'1.3rem'} /> },
   ];

   return (
      <Flex pt='0' gap='4rem' flexDir='column' align='center' justify='center'>
         {option.map((el) => (
            <Flex
               _active={{ bg: '#2E333D' }}
               _hover={{ bg: '#2E333D' }}
               color={pathName?.includes(el.name.toLowerCase()) ? '#eee' : textColor}
               bg={pathName?.includes(el.name.toLowerCase()) ? '#2E333D' : ''}
               key={Math.random()}
               align={'center'}
               justify={'center'}
               gap={4}
               w='100%'
               p='.5rem'
               px='0rem'
               cursor={'pointer'}
               onClick={() => router.push(`/dashboard/${el.name.toLowerCase()}`)}
            >
               <Box>{el.icon}</Box>
               <Box fontSize={'1.2rem'}>{el.name}</Box>
            </Flex>
         ))}
      </Flex>
   );
};
