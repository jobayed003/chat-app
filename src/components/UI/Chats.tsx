// @ts-nocheck
'use client';
import {
   Box,
   Button,
   Drawer,
   DrawerContent,
   DrawerOverlay,
   Flex,
   Grid,
   GridItem,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Skeleton,
   SkeletonCircle,
   Text,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import AuthContext from '@context/AuthProvider';
import AppContext from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import { useIsOnline } from '@hooks/useIsOnline';
import { pusherClient } from '@libs/pusher';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { MdMenu, MdMessage, MdSearch, MdVideoCall } from 'react-icons/md';
import SideBar from './SideBar';
import Video from './Video';

const Chats = () => {
   const [message, setMessage] = useState({});
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { users } = useContext(AuthContext);
   const isOnline = useIsOnline();
   const borderColor = useColorModeValue('light', 'dark');
   const { user } = useUser();
   const { id } = useConversationId();

   const btnRef = useRef(null);

   const compareDates = (millis1) => {
      const present = Date.now();
      const date1 = new Date(millis1);
      const date2 = new Date(present);
      const moment1 = moment(date1);
      const moment2 = moment(date2);
      const difference = moment.duration(moment2.diff(moment1));
      return {
         date1,
         date2,
         difference,
      };
   };

   useEffect(() => {
      const messageHandler = (data: MessageDetails) => {
         setMessage(data);
      };

      const handleEvent = () => {
         pusherClient.subscribe(id);
         pusherClient.bind('newMessage', messageHandler);
      };

      id && handleEvent();
      return () => {
         pusherClient.unsubscribe(id);
         pusherClient.unbind('newMessage', messageHandler);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   return (
      <GridItem w='100%' borderRight={borderColor} h='100vh'>
         <Grid templateRows={'100px 1fr'}>
            <Flex
               borderBlockEnd={borderColor}
               align={{ sm: 'center', base: 'start' }}
               p={{ md: '1.5rem', base: '.5rem' }}
               flexDir={{ sm: 'row', base: 'column' }}
               gap={'.5rem'}
               justifyContent={{ sm: 'space-between', base: 'center' }}
            >
               <Box display={{ base: 'block', md: 'none' }} onClick={isOpen ? onClose : onOpen} ref={btnRef}>
                  <MdMenu />
               </Box>

               <SideNav isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
               <DynamicText fontSize={{ md: '2rem', base: '.8rem' }}>Messages</DynamicText>
               <Box fontSize={{ md: '2rem', base: '1rem' }}>
                  <MdSearch cursor={'pointer'} />
               </Box>
            </Flex>
            <Box>
               <Flex
                  align={'center'}
                  gap='.5rem'
                  color={'grayText'}
                  fontSize={{ md: '.8rem', base: '.6rem' }}
                  p={{ md: '1.5rem', sm: '1rem', base: '.5rem' }}
               >
                  <MdMessage />
                  <Text>All Messages</Text>
               </Flex>
               {user &&
                  users.map((signedUser) => (
                     <ChatUser
                        key={Math.random()}
                        name={signedUser.username}
                        email={signedUser.emailAddresses[0].emailAddress}
                        status={isOnline ? 'Online' : 'Offline'}
                        img={signedUser.imageUrl}
                        messageDetails={{
                           sent: message.sent,
                           lastMessage:
                              message.messsage ||
                              'Joined ' + compareDates(signedUser.createdAt).difference.humanize() + ' ago',
                        }}
                        lastActive={compareDates(1700746673468).difference.humanize()}
                        userId={signedUser.id}
                        currentUser={user}
                     />
                  ))}

               {users.length === 0 && (
                  <Flex gap='.9rem' align='center' px='1rem'>
                     <Box>
                        <SkeletonCircle size='10' />
                     </Box>
                     <Box display={'flex'} flexDir={'column'} gap='.3rem'>
                        <Skeleton height='15px' w={'200px'} />
                        <Skeleton height='15px' w={'200px'} />
                     </Box>
                  </Flex>
               )}
            </Box>
         </Grid>
      </GridItem>
   );
};

export default Chats;

const ChatUser = ({ name, img, email, userId, status, messageDetails, currentUser }: User) => {
   const router = useRouter();
   const { isLoading, setIsLoading } = useContext(AppContext);
   const { id } = useConversationId();

   const bgColor = useColorModeValue('#ddd', 'blue.800');

   const handleClick = async () => {
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

            if (conversationId === id) {
               setIsLoading(false);
               return;
            }

            router.push(`/dashboard/messages/${conversationId}`);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Box
         cursor={'pointer'}
         _active={{ bg: bgColor }}
         _hover={{ bg: bgColor }}
         px='1rem'
         onClick={(e) => {
            !isLoading && handleClick();
         }}
      >
         <Flex justify={'space-between'} align={'center'}>
            <Flex py='1rem' align={'center'} gap={'.8rem'} justify={'center'}>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={45} height={40} alt='user img' src={img} />
               </Box>

               <Box display={{ md: 'block', base: 'none' }}>
                  <DynamicText fontSize='14px'>{name}</DynamicText>
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

// const PinnedMessages = () => {
//    return (
//       <Box p='1.5rem'>
//          <Flex align={'center'} gap='.5rem' color={'gray'} fontSize={'.8rem'}>
//             <MdLocationPin />
//             <Text>Pinned Message</Text>
//          </Flex>
//       </Box>
//    );
// };

const SideNav = ({ isOpen, onClose, btnRef }: { isOpen: boolean; onClose: () => {}; btnRef: HTMLButtonElement }) => {
   return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
         <DrawerOverlay />
         <DrawerContent width={'80px'}>
            <SideBar onClose={onClose} />
         </DrawerContent>
      </Drawer>
   );
};
