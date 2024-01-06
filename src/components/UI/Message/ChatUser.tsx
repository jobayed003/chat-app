'use client';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/UI/Util/DynamicText';
import AuthContext from '@context/AuthProvider';
import AppContext from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';

import { compareDates } from '@libs/compareDates';
import { pusherClient } from '@libs/pusher';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useContext, useEffect, useReducer, useState } from 'react';

type State = { lastSent: string; lastTextsLength: number; lastMessage: string; isSeen: boolean };

type Action = { type: 'ADD' | 'UPDATE'; payload: State };

const messageReducer = (state: State, action: Action): State => {
   switch (action.type) {
      case 'ADD':
         return { ...action.payload };
      case 'UPDATE':
         return {
            ...action.payload,
            lastTextsLength: state.lastTextsLength + action.payload.lastTextsLength,
         };
      default:
         return state;
   }
};

const ChatUser = ({ chats, conversationUser, conversationId }: Conversation) => {
   const [state, dispatch] = useReducer(messageReducer, {
      lastSent: '',
      lastTextsLength: 0,
      lastMessage: '',
      isSeen: false,
   });

   const { lastSender, setLastSender } = useContext(AppContext);
   const { currentUser } = useContext(AuthContext);
   const { id } = useConversationId();

   const [isClicked, setIsClicked] = useState(false);
   const router = useRouter();

   const bgColor = useColorModeValue('#ddd', 'blue.800');
   // const handleClick = useCallback(async () => {
   //    // try {
   //    //    setIsLoading(true);
   //    //    const res = await fetch('/api/conversation', {
   //    //       method: 'POST',
   //    //       body: JSON.stringify({
   //    //          senderId: currentUser.id,
   //    //          receiverId: userId,
   //    //          users: [userId, currentUser.id],
   //    //          chats: {},
   //    //       }),
   //    //    });
   //    //    if (res.ok) {
   //    //       const { conversationId } = await res.json();
   //    //       if (conversationId === id) {
   //    //          setIsLoading(false);
   //    //          return;
   //    //       }
   //    //       router.push(`/dashboard/messages/${conversationId}`);
   //    //    }
   //    // } catch (error) {
   //    //    console.log(error);
   //    // }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [id]);

   // console.log(messageDetails);
   const updateSeenStatus = async ({ id }: { id: string }) => {
      await fetch('/api/messages/seen', { method: 'POST', body: JSON.stringify({ id }) });
   };

   useEffect(() => {
      const messageHandler = async (data: MessageDetails) => {
         setLastSender(data.sender);
         const seenStatus = id ? true : data.seen;
         if (data.sender !== currentUser.id) {
            await updateSeenStatus({ id: conversationId });

            if (state.lastTextsLength > 0) {
               dispatch({
                  type: 'ADD',
                  payload: {
                     lastMessage: data.message,
                     lastSent: data.sent,
                     lastTextsLength: 1,
                     isSeen: seenStatus,
                  },
               });
            } else {
               dispatch({
                  type: 'UPDATE',
                  payload: {
                     lastMessage: data.message,
                     lastSent: data.sent,
                     lastTextsLength: 1,
                     isSeen: seenStatus,
                  },
               });
            }
         } else {
            dispatch({
               type: 'ADD',
               payload: { lastMessage: data.message, lastSent: data.sent, lastTextsLength: 1, isSeen: false },
            });
         }
      };

      pusherClient.subscribe(conversationId);
      pusherClient.bind('newMessage', messageHandler);

      return () => {
         pusherClient.unsubscribe(conversationId);
         pusherClient.unbind('newMessage', messageHandler);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [conversationId]);

   useEffect(() => {
      if (chats) {
         setLastSender(chats.senderId);
         const lastMessage = chats.texts.at(-1)!;

         dispatch({
            type: 'ADD',
            payload: { lastTextsLength: chats.texts.length + 1, lastMessage, lastSent: chats.sent, isSeen: chats.seen },
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   return (
      <Box
         cursor={'pointer'}
         _hover={{ bg: bgColor }}
         bg={isClicked ? bgColor : ''}
         borderRadius={'5px'}
         px='.5rem'
         onClick={async () => {
            setIsClicked(true);
            !id && (await updateSeenStatus({ id: conversationId }));
            router.push(`/dashboard/messages/${conversationId}`);
         }}
      >
         <Flex align={'center'} justify={'space-between'}>
            <Flex py='1rem' align={'center'} gap={'.8rem'} justify={'center'}>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={45} height={40} alt='user img' src={conversationUser.imageUrl} />
               </Box>

               <Box>
                  <DynamicText fontSize='1rem'>{conversationUser.username}</DynamicText>
                  <DynamicText
                     color={lastSender !== currentUser.id && !state.isSeen ? 'white' : 'gray'}
                     fontSize='12px'
                  >
                     {lastSender === currentUser.id ? 'You: ' : ''}
                     {state.lastTextsLength === 0
                        ? 'Joined ' + compareDates(+conversationUser.createdAt!).difference.humanize() + ' ago'
                        : state.lastMessage}
                  </DynamicText>

                  {/* <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                      {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails?.lastMessages}
                   </DynamicText> */}
               </Box>
            </Flex>
            <Flex direction={'column'} gap={'.5rem'}>
               <DynamicText fontSize='12px' color={lastSender !== currentUser.id && !state.isSeen ? 'white' : 'gray'}>
                  {state.lastSent}
               </DynamicText>

               {!state.isSeen && !!state.lastTextsLength && lastSender !== currentUser.id && (
                  <Flex
                     bg={'#D34242'}
                     borderRadius={'50%'}
                     align={'center'}
                     justify={'center'}
                     alignSelf={'end'}
                     w='15px'
                     h='15px'
                  >
                     <DynamicText fontSize={'12px'} color={'#fff'}>
                        {/* {chats?.text?.length} */}
                        {state.lastTextsLength - 1}
                     </DynamicText>
                  </Flex>
               )}
            </Flex>
         </Flex>
      </Box>
   );
};

const MemoizeChatUser = memo(ChatUser);

export default MemoizeChatUser;
