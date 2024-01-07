'use client';

import { Box, Button, Flex, HStack, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import DynamicButton from '@components/UI/Util/DynamicButton';
import DynamicText from '@components/UI/Util/DynamicText';
import { buttonStyles } from '@config/data';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function NavBar() {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
      <Box
         pt='.5rem'
         pb='1rem'
         pos={'fixed'}
         top={'0'}
         w='100%'
         bg={useColorModeValue('#fff', 'colors.brand.900')}
         zIndex={1000}
         boxShadow={'rgba(0, 0, 0, 0.06) 0px 8px 24px'}
         mb={'1rem'}
         ml={{ md: '-1rem' }}
      >
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
               {[1, 2, 3].map((link) => (
                  <div key={link} />
               ))}
            </HStack>

            <Stack
               flex={{ base: 1, md: 0 }}
               justify={'flex-end'}
               direction={'row'}
               spacing={{ md: 6, base: 2 }}
               align={'center'}
               pr={'1rem'}
            >
               <Button px='0' style={{ ...buttonStyles }} onClick={toggleColorMode}>
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
      </Box>
   );
}
