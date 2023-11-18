'use client';

import { GridItem, useColorModeValue } from '@chakra-ui/react';
import ChatBox from '@components/UI/ChatBox';
import Chats from '@components/UI/Chats';

const Messages = () => {
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <>
         <GridItem w='100%'>
            <Chats />
         </GridItem>
         <GridItem border={borderColor} height={'100vh'}>
            <ChatBox />
         </GridItem>
      </>
   );
};

export default Messages;
