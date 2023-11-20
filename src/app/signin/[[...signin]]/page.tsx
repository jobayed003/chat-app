'use client';
import { Flex } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
   return (
      <Flex justify={'center'} align={'center'} height='100vh'>
         <SignIn />
      </Flex>
   );
}
