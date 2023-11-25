'use client';

import { Box, Button, Flex, Grid, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import { buttonStyles } from '@config/data';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

const SideBar = () => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { signOut } = useAuth();
   const { user } = useUser();
   const router = useRouter();
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <Grid templateRows={'100px auto'} borderRight={borderColor} h='100%'>
         <Box borderBottom={borderColor} display={'flex'} fontSize={'2.5rem'} p={'1.5rem'} alignItems={'center'}>
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
                  <Link href={'/signin'} onClick={() => signOut()}>
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
   const bgColor = useColorModeValue('#ddd', '#2E333D');

   const option = [
      { name: 'Messages', icon: <AiOutlineMessage fontSize={'1.3rem'} /> },
      { name: 'Settings', icon: <AiOutlineSetting fontSize={'1.3rem'} /> },
   ];

   return (
      <Flex pt='0' px='2rem' gap='4rem' flexDir='column' align='center' justify='center'>
         {option.map((el) => (
            <Flex
               borderRadius={'20px'}
               _active={{ bg: bgColor }}
               _hover={{ bg: bgColor }}
               bg={pathName?.includes(el.name.toLowerCase()) ? bgColor : ''}
               key={Math.random()}
               align={'center'}
               justify={'center'}
               gap={4}
               w='100%'
               p='.5rem'
               px='0'
               cursor={'pointer'}
               onClick={() => router.push(`/dashboard/${el.name.toLowerCase()}`)}
            >
               <DynamicText>{el.icon}</DynamicText>
               <DynamicText fontSize={'1.2rem'}>{el.name}</DynamicText>
            </Flex>
         ))}
      </Flex>
   );
};
