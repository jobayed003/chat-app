'use client';

import { GridItem } from '@chakra-ui/react';
import ChatBox from '../../components/Messages/ChatBox';
import Chats from '../../components/Messages/Chats';

const MessagePage = () => {
  return (
    <>
      <GridItem w='100%'>
        <Chats />
      </GridItem>
      <GridItem border={'1px solid #ddd'}>
        <ChatBox />
      </GridItem>
    </>
  );
};

export default MessagePage;
