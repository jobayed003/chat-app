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
import { NavLink } from '@components/util/NavLink';
import { buttonStyles } from '@config/data';
import { useIsVisible } from '@hooks/useIsVisible';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

const Links = ['About', 'Blog', 'Contact'];

export default function NavBar() {
   const { colorMode, toggleColorMode } = useColorMode();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const ref = useRef(null);
   const isVisible = useIsVisible(ref);

   return (
      <Box bg={useColorModeValue('colormode.light', 'colormode.dark')} px={4} pt='.5rem' pb='1rem' ref={ref}>
         <Flex
            h={16}
            alignItems={'center'}
            justifyContent={'space-around'}
            // position={!isVisible ? 'fixed' : 'relative'}
         >
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
                     <DynamicText
                        marginLeft={'.5rem'}
                        color={'colors.secondary'}
                        fontFamily={'DM Sans'}
                        fontWeight={'bold'}
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
