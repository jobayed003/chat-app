'use client';

import { Box, Button, CloseButton, Flex, Grid, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import { buttonStyles } from '@config/data';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

type SideBarProps = {
   onClose?: () => {};
};

const SideBar = ({ onClose }: SideBarProps) => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { signOut } = useAuth();
   const { user } = useUser();
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <Grid templateRows={'100px auto'} borderRight={borderColor} h='100%'>
         <Box
            borderBottom={borderColor}
            display={'flex'}
            fontSize={'2.5rem'}
            p={{ md: '1rem' }}
            alignItems={'center'}
            justifyContent={'space-between'}
         >
            <DynamicText marginLeft={'.5rem'} color={'colors.secondary'} fontFamily={'DM Sans'} fontWeight={'bold'}>
               <Text as={'span'} color={'colors.primary'}>
                  chat
               </Text>
               IT
            </DynamicText>
            <CloseButton fontSize={'1.2rem'} px='2rem' onClick={onClose} display={{ base: 'blockk', md: 'none' }} />
         </Box>
         <Grid templateRows={'1fr auto'}>
            <Menus onClose={onClose!} />
            <Flex
               align={'center'}
               gap={{ lg: '1rem', sm: '.5rem', base: '1rem' }}
               p={{ lg: '1rem', sm: '.5rem', base: '1rem' }}
               flexDir={'row'}
            >
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
               <Button ml={'auto'} style={{ ...buttonStyles }} px={{ sm: '.4rem' }} onClick={toggleColorMode}>
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

const Menus = ({ onClose }: { onClose: () => {} }) => {
   const pathName = usePathname()?.split('/');
   const router = useRouter();
   const bgColor = useColorModeValue('colors.primary', 'blue.800');
   const textColor = useColorModeValue('#fff', 'dark');

   const option = [
      { name: 'Messages', icon: <AiOutlineMessage fontSize={'1.3rem'} /> },
      { name: 'Settings', icon: <AiOutlineSetting fontSize={'1.3rem'} /> },
   ];

   return (
      <Flex pt='0' px={{ sm: '1rem' }} gap={'4rem'} flexDir='column' align='center' justify='center'>
         {option.map((el) => (
            <Flex
               borderRadius={'20px'}
               _active={{ bg: bgColor, color: '#fff' }}
               _hover={{ bg: bgColor, color: '#fff' }}
               bg={pathName?.includes(el.name.toLowerCase()) ? bgColor : ''}
               color={pathName?.includes(el.name.toLowerCase()) ? textColor : ''}
               key={Math.random()}
               align={'center'}
               justify={'center'}
               gap={4}
               w='100%'
               p='.5rem'
               px='0'
               cursor={'pointer'}
               onClick={() => {
                  onClose !== undefined && onClose();
                  router.push(`/dashboard/${el.name.toLowerCase()}`);
               }}
            >
               <Text>{el.icon}</Text>
               <Text fontSize={'1.2rem'}>{el.name}</Text>
            </Flex>
         ))}
      </Flex>
   );
};
