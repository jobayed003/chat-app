'use client';

import {
   Box,
   Button,
   Flex,
   HStack,
   IconButton,
   Stack,
   Text,
   useColorMode,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';
import { buttonStyles } from '@config/data';
import Link from 'next/link';
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

interface Props {
   children: React.ReactNode;
}

const Links = ['About', 'Blog', 'Contact'];

const NavLink = (props: Props) => {
   const { children } = props;

   return (
      <Link href={'/' + children}>
         <DynamicText
            px={2}
            py={1}
            rounded={'md'}
            cursor={'pointer'}
            _hover={{
               bg: useColorModeValue('gray.200', 'gray.700'),
            }}
         >
            {children}
         </DynamicText>
      </Link>
   );
};

export default function NavBar() {
   const { colorMode, toggleColorMode } = useColorMode();
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <Box bg={useColorModeValue('colormode.light', 'colormode.dark')} px={4} pt='.5rem' pb='1rem'>
         <Flex h={16} alignItems={'center'} justifyContent={'space-around'}>
            <IconButton
               size={'sm'}
               icon={isOpen ? <AiOutlineClose fontSize={'1.5rem'} /> : <AiOutlineBars fontSize={'1.5rem'} />}
               aria-label={'Open Menu'}
               display={{ md: 'none' }}
               onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
               <Box>
                  <Flex fontSize={'2.5rem'} align={'center'}>
                     <DynamicText marginLeft={'.5rem'} color={'colors.secondary'}>
                        <Text as={'span'} color={'colors.primary'}>
                           chat
                        </Text>
                        IT
                     </DynamicText>
                  </Flex>
               </Box>
            </HStack>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
               {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
               ))}
            </HStack>

            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6} align={'center'}>
               <Button style={{ ...buttonStyles }} onClick={toggleColorMode}>
                  {colorMode === 'dark' ? (
                     <FaSun fontSize={'1.5rem'} color={'rgb(160, 174, 192)'} />
                  ) : (
                     <FaMoon fontSize={'1.5rem'} color={'rgb(160, 174, 192)'} />
                  )}
               </Button>
               <Link href='/signin'>Login</Link>
               <Link href={'/signup'}>
                  <DynamicButton>Signup</DynamicButton>
               </Link>
            </Stack>
         </Flex>

         {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
               <Stack as={'nav'} spacing={4}>
                  {Links.map((link) => (
                     <NavLink key={link}>{link}</NavLink>
                  ))}
               </Stack>
            </Box>
         ) : null}
      </Box>
   );
}
