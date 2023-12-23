'use client';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicText from '@components/UI/Util/DynamicText';
import { compareDates } from '@libs/compareDates';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';

const ChatUser = ({ chats, conversationUser, conversationId }: Conversation) => {
   const [isClicked, setIsClicked] = useState(false);
   const router = useRouter();
   const { user } = useUser();

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

   return (
      <Box
         cursor={'pointer'}
         _hover={{ bg: bgColor }}
         bg={isClicked ? bgColor : ''}
         borderRadius={'5px'}
         px='.5rem'
         onClick={() => {
            setIsClicked(true);
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
                  <DynamicText color={'gray'} fontSize='12px'>
                     {chats?.senderId === user?.id ? 'You:' : ''} {chats?.text?.at(-1)}
                     {!chats && 'Joined ' + compareDates(+conversationUser.createdAt!).difference.humanize() + ' ago'}
                  </DynamicText>

                  {/* <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                      {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails?.lastMessages}
                   </DynamicText> */}
               </Box>
            </Flex>
            <Flex direction={'column'} gap={'.5rem'}>
               <DynamicText fontSize='12px' color={'gray'}>
                  {chats?.sent}
               </DynamicText>

               {chats && chats?.senderId !== user?.id && (
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
                        {chats?.text?.length}
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
