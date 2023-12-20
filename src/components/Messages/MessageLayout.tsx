'use client';

import { Flex, GridItem } from '@chakra-ui/react';
import Chats from '@components/Messages/Chats';
import Spinners from '@components/UI/Spinners';
import DynamicText from '@components/UI/Util/DynamicText';
import AppContext from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import { useParams } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react';

type MessageLayoutProps = {
   children: ReactNode;
   users: CurrentUser[];
   conversations: Conversation[];
};

const MessageLayout = (props: MessageLayoutProps) => {
   const { isLoading, setConversation } = useContext(AppContext);
   const params = useParams();

   const { id } = useConversationId();

   useEffect(() => {
      const currentConv = props.conversations.filter((c) => c.conversationId === id)[0];
      setConversation(currentConv);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params?.conversationId]);

   return (
      <>
         <GridItem w='100%' display={{ base: 'block' }}>
            <Chats users={props.users} conversations={props.conversations} />
         </GridItem>
         {props.children}
         {!params?.conversationId && !isLoading && (
            <Flex justify={'center'} align='center' display={{ base: 'none', md: 'flex' }}>
               <DynamicText fontSize={{ md: '2rem', base: '1rem' }}>Start chatting with friends</DynamicText>
            </Flex>
         )}

         {!params?.conversationId && isLoading && (
            <GridItem height={'100vh'} display={{ base: 'none', md: 'block' }}>
               <Spinners />
            </GridItem>
         )}
      </>
   );
};

export default MessageLayout;
