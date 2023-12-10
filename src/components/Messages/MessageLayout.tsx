'use client';

import { Flex, GridItem } from '@chakra-ui/react';
import Chats from '@components/Messages/Chats';
import Spinners from '@components/UI/Spinners';
import DynamicText from '@components/UI/Util/DynamicText';
import AppContext from '@context/StateProvider';
import { useParams } from 'next/navigation';
import { ReactNode, useContext } from 'react';

type MessageLayoutProps = {
   users: CurrentUser[];
   children: ReactNode;
};

const MessageLayout = (props: MessageLayoutProps) => {
   const { isLoading } = useContext(AppContext);
   const params = useParams();
   return (
      <>
         <GridItem w='100%' display={{ base: 'block' }}>
            <Chats users={props.users} />
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
