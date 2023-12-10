'use client';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/UI/DynamicText';
import AppContext from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';

export const ChatUser = ({ name, img, userId, status, messageDetails, currentUser }: Conversation) => {
   const router = useRouter();
   const { isLoading, setIsLoading } = useContext(AppContext);
   const { id } = useConversationId();

   const bgColor = useColorModeValue('#ddd', 'blue.800');

   const handleClick = useCallback(async () => {
      // const conversationDetails = JSON.parse(localStorage.getItem('conversationDetails') as string);

      // const { conversationId } = conversationDetails;

      // if (conversationId) {
      //    setIsLoading(false);
      //    router.push(`/dashboard/messages/${conversationId}`);
      // } else {
      try {
         setIsLoading(true);
         const res = await fetch('/api/conversation', {
            method: 'POST',
            body: JSON.stringify({
               senderId: currentUser.id,
               receiverId: userId,
               users: [userId, currentUser.id],
            }),
         });
         if (res.ok) {
            const { conversationId } = await res.json();

            localStorage.setItem(
               'conversationDetails',
               JSON.stringify({
                  conversationId,
                  senderId: currentUser.id,
                  receiverId: userId,
                  users: [userId, currentUser.id],
               })
            );

            if (conversationId === id) {
               setIsLoading(false);
               return;
            }

            router.push(`/dashboard/messages/${conversationId}`);
         }
      } catch (error) {
         console.log(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   return (
      <Box
         cursor={'pointer'}
         _active={{ bg: bgColor }}
         _hover={{ bg: bgColor }}
         borderRadius={'5px'}
         px='.5rem'
         onClick={(e) => {
            !isLoading && handleClick();
         }}
      >
         <Flex align={'center'}>
            <Flex py='1rem' align={'center'} gap={'.8rem'} justify={'center'}>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={45} height={40} alt='user img' src={img} />
               </Box>

               <Box>
                  <DynamicText fontSize='1rem'>{name}</DynamicText>
                  <DynamicText color={'gray'} fontSize='12px'>
                     {messageDetails?.lastMessage}
                  </DynamicText>

                  {/* <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                      {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails?.lastMessages}
                   </DynamicText> */}
               </Box>
            </Flex>
            <Flex direction={'column'}>
               {/* <DynamicText fontSize='12px' color={'gray'}>
                   {messageDetails?.sent}
                </DynamicText> */}

               {/* <Flex
                   bg={'#D34242'}
                   borderRadius={'50%'}
                   align={'center'}
                   justify={'center'}
                   alignSelf={'end'}
                   w='15px'
                   h='15px'
                >
                   <DynamicText fontSize={'12px'} color={'#fff'}>
                      {`${messageDetails?.lastMessages.length}`}
                   </DynamicText>
                </Flex> */}
            </Flex>
         </Flex>
      </Box>
   );
};
