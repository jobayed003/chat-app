'use client';

import { Box, Button, Flex, Grid, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { buttonStyles } from '@config/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillMessage, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

const SideBar = () => {
   const { colorMode, toggleColorMode } = useColorMode();

   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <Grid templateRows={'100px auto'} borderRight={borderColor} h='100%'>
         <Box borderBottom={borderColor} display={'flex'} fontSize={'2.5rem'} p={'1.5rem'} alignItems={'center'}>
            <AiFillMessage color='blue' />
            <Text color={textColor} marginLeft={'.5rem'}>
               chatIT
            </Text>
         </Box>
         <Grid templateRows={'1fr auto'}>
            <Flex align={'center'} justify={'center'}>
               <Menus />
            </Flex>
            <Flex align={'center'} gap='1rem' p='1rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image src='/assets/user.jpeg' alt='avatar' width={40} height={40} />
               </Box>
               <Box>
                  <DynamicText as={'p'} m='0' value={'John'} />
                  <Link href={'/'}>
                     <Text color={'graytext'} fontSize={'.9rem'}>
                        Logout
                     </Text>
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
   const pathName = usePathname().replace('/dashboard/', '');
   const router = useRouter();
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   const option = [
      { name: 'Messages', icon: <AiOutlineMessage fontSize={'1.3rem'} /> },
      { name: 'Settings', icon: <AiOutlineSetting fontSize={'1.3rem'} /> },
   ];

   return (
      <Flex p='2rem' pt='0' gap='4rem' flexDir='column'>
         {option.map((el) => (
            <Flex
               color={pathName === el.name.toLowerCase() ? '#eee' : textColor}
               bg={pathName === el.name.toLowerCase() ? 'blue.800' : ''}
               key={Math.random()}
               align={'center'}
               gap={4}
               borderRadius={'20px'}
               p='.5rem'
               px='1.5rem'
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
