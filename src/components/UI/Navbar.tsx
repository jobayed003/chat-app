'use client';

import {
   Box,
   Button,
   Flex,
   HStack,
   Stack,
   Text,
   useBreakpointValue,
   useColorMode,
   useDisclosure,
} from '@chakra-ui/react';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';
import { NavLink } from '@components/util/NavLink';
import { buttonStyles } from '@config/data';
import { useIsVisible } from '@hooks/useIsVisible';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

const Links = ['About', 'Blog', 'Contact'];

export default function NavBar() {
   const { colorMode, toggleColorMode } = useColorMode();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const ref = useRef(null);

   const isVisible = useIsVisible(ref);

   return (
      <Box px={useBreakpointValue({ base: 1, md: 4 })} pt='.5rem' pb='1rem' ref={ref}>
         <Flex h={16} alignItems={'center'} justifyContent={'space-around'}>
            <HStack spacing={8} alignItems={'center'}>
               <Box>
                  <Flex fontSize={'2.5rem'} align={'center'}>
                     <DynamicText
                        marginLeft={'.5rem'}
                        color={'colors.secondary'}
                        fontFamily={'DM Sans'}
                        fontWeight={'bold'}
                        ml={{ base: '1rem' }}
                     >
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
               <Link href='/signin'>
                  <DynamicText>Login</DynamicText>
               </Link>
               <Flex onClick={isOpen ? onClose : onOpen} aria-label={'Open Menu'} display={{ md: 'none' }}>
                  {isOpen ? <AiOutlineClose fontSize={'1.5rem'} /> : <MdMenu fontSize={'1.5rem'} />}
               </Flex>

               <Link href={'/signup'}>
                  <DynamicButton display={{ base: 'none', md: 'flex' }}>Signup</DynamicButton>
               </Link>
            </Stack>
         </Flex>

         {isOpen && (
            <Box pb={4} display={{ md: 'none' }}>
               <Stack as={'nav'} spacing={4}>
                  {Links.map((link) => (
                     <NavLink key={link}>{link}</NavLink>
                  ))}
               </Stack>
            </Box>
         )}
      </Box>
   );
}

const ROLLS = [172667, 392728];
const REG = [1811874254, 1811941923];

// Reg: 	1811874254
// Roll: 	172667

// Reg: 	1811941923
// Roll: 	392728
