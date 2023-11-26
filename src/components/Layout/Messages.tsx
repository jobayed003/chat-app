'use client';

import { Flex, GridItem } from '@chakra-ui/react';
import Chats from '@components/UI/Chats';
import DynamicText from '@components/util/DynamicText';
import Spinners from '@components/util/Spinners';
import AppContext from '@context/StateProvider';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

const Messages = ({ children }: ChildrenType) => {
   const { isLoading } = useContext(AppContext);
   const params = useParams();
   return (
      <>
         <GridItem w='100%'>
            <Chats />
         </GridItem>
         {children}
         {!params?.conversationId && !isLoading && (
            <Flex justify={'center'} align='center'>
               <DynamicText fontSize='2rem'>Start chatting with friends</DynamicText>
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
