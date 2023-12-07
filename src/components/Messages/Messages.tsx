'use client';

import { Flex, GridItem } from '@chakra-ui/react';
import Chats from '@components/Messages/Chats';
import DynamicText from '@components/UI/DynamicText';
import Spinners from '@components/UI/Spinners';
import AppContext from '@context/StateProvider';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

const Messages = ({ children }: ChildrenType) => {
   const { isLoading } = useContext(AppContext);
   const params = useParams();
   return (
      <>
         <GridItem w='100%' display={{ base: 'block' }}>
            <Chats />
         </GridItem>
         {children}
         {!params?.conversationId && !isLoading && (
            <Flex justify={'center'} align='center' display={{ base: 'none', md: 'flex' }}>
               <DynamicText fontSize={{ md: '2rem', base: '1rem' }}>Start chatting with friends</DynamicText>
            </Flex>
         )}

         {!params?.conversationId && isLoading && (
            <GridItem height={'100vh'}>
               <Spinners />
            </GridItem>
         )}
      </>
   );
};

export default Messages;