'use client';

import { Flex, GridItem } from '@chakra-ui/react';
import Chats from '@components/UI/Chats';
import DynamicText from '@components/util/DynamicText';
import { useParams } from 'next/navigation';

const Messages = ({ children }: ChildrenType) => {
   const params = useParams();
   return (
      <>
         <GridItem w='100%'>
            <Chats />
         </GridItem>
         {children}

         {!params?.userId && (
            <Flex justify={'center'} align='center'>
               <DynamicText fontSize='2rem'>Start chatting with friends</DynamicText>
            </Flex>
         )}
      </>
   );
};

export default Messages;
