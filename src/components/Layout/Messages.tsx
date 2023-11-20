'use client';

import { GridItem, useColorModeValue } from '@chakra-ui/react';
import ChatBox from '@components/UI/ChatBox';
import Chats from '@components/UI/Chats';
import { auth } from '@firebase/config';
import { fetchData } from '@firebase/fetchData';

const Messages = () => {
   const borderColor = useColorModeValue('light', 'dark');

   const get = async () => {
      await fetchData('users', auth?.currentUser?.uid);
   };

   get();

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
