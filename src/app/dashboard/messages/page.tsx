'use client';

import { GridItem, useColorModeValue } from '@chakra-ui/react';
import ChatBox from '@components/Messages/ChatBox';
import Chats from '@components/Messages/Chats';

const MessagePage = () => {
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <>
         <GridItem w='100%'>
            <Chats />
         </GridItem>
         <GridItem border={borderColor}>
            <ChatBox />
         </GridItem>
      </>
   );
};

export default MessagePage;
