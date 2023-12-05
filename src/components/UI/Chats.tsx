'use client';
import {
   Box,
   Drawer,
   DrawerContent,
   DrawerOverlay,
   Flex,
   Grid,
   GridItem,
   Skeleton,
   SkeletonCircle,
   Text,
   useColorModeValue,
   useDisclosure,
   useToast,
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
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MdMenu, MdMessage, MdSearch } from 'react-icons/md';
import SideBar from './SideBar';

const Chats = () => {
   const [messages, setMessages] = useState({
      message: '',
      sent: '',
   });
   const [showSkeleton, setShowSkeleton] = useState(true);

   // @ts-ignore
   const { conversationId } = useParams();

   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const { users } = useContext(AuthContext);
   const isOnline = useIsOnline();

   const borderColor = useColorModeValue('light', 'dark');
   const { isLoaded, user } = useUser();
   const { id } = useConversationId();

   const btnRef = useRef<HTMLButtonElement>(null);

   const compareDates = (millis1: number) => {
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
         setMessages(data);
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

   useEffect(() => {
      const timer = setTimeout(() => {
         setShowSkeleton(false);
      }, 4000);

      !isLoaded &&
         !showSkeleton &&
         toast({
            position: 'top-right',
            title: 'Error Loading',
            description: 'Something went wrong. Try reloading',
            status: 'error',
            duration: 9000,
            isClosable: true,
         });

      return () => {
         clearTimeout(timer);
      };
   }, []);

   return (
      <GridItem
         w='100%'
         borderRight={borderColor}
         h={'100vh'}
         display={{ base: conversationId ? 'none' : 'block', md: 'block' }}
      >
         <Grid templateRows={'100px 1fr'}>
            <Flex
               borderBlockEnd={borderColor}
               align={'center'}
               p={'1.5rem'}
               flexDir={'row'}
               gap={'.5rem'}
               justifyContent={'space-between'}
            >
               <Box
                  display={{ base: 'block', md: 'none' }}
                  fontSize={'1.5rem'}
                  onClick={isOpen ? onClose : onOpen}
                  // @ts-expect-error
                  ref={btnRef}
               >
                  <MdMenu />
               </Box>

               <SideNav isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
               <DynamicText fontSize={'2rem'}>Messages</DynamicText>
               <Box fontSize={'1.5rem'}>
                  <MdSearch cursor={'pointer'} />
               </Box>
            </Flex>
            <Box>
               <Flex align={'center'} gap='.5rem' color={'grayText'} fontSize={'.8rem'} p={'1.5rem'}>
                  <MdMessage />
                  <Text>All Messages</Text>
               </Flex>
               {user &&
                  users.map((signedUser) => (
                     <ChatUser
                        key={Math.random()}
                        name={signedUser.username!}
                        email={signedUser.emailAddresses[0].emailAddress}
                        status={isOnline ? 'Online' : 'Offline'}
                        img={signedUser.imageUrl}
                        messageDetails={{
                           sent: messages.sent,
                           lastMessage:
                              messages.message ||
                              'Joined ' + compareDates(signedUser.createdAt).difference.humanize() + ' ago',
                        }}
                        lastActive={compareDates(1700746673468).difference.humanize()}
                        userId={signedUser.id}
                        currentUser={user}
                     />
                  ))}
               {/* @ts-ignore */}
               {users.length === 0 && showSkeleton ? (
                  <Flex gap='.9rem' align='center' px='1rem'>
                     <Box>
                        <SkeletonCircle size='10' />
                     </Box>
                     <Box display={'flex'} flexDir={'column'} gap='.3rem'>
                        <Skeleton height='15px' w={'200px'} />
                        <Skeleton height='15px' w={'200px'} />
                     </Box>
                  </Flex>
               ) : (
                  // @ts-ignore
                  users.length === 0 && (
                     <Flex justify='center'>
                        <DynamicText fontSize={'1.5rem'}>No conversation found</DynamicText>
                     </Flex>
                  )
               )}
            </Box>
         </Grid>
      </GridItem>
   );
};

export default Chats;

const ChatUser = ({ name, img, userId, status, messageDetails, currentUser }: Conversation) => {
   const router = useRouter();
   const { isLoading, setIsLoading } = useContext(AppContext);
   const { id } = useConversationId();

   const bgColor = useColorModeValue('#ddd', 'blue.800');

   const handleClick = useCallback(async () => {
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
   }, [id]);

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
         <Flex align={'center'} px='1rem'>
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

const SideNav = ({
   isOpen,
   onClose,
   btnRef,
}: {
   isOpen: boolean;
   onClose: () => void;
   btnRef: RefObject<HTMLButtonElement>;
}) => {
   return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
         <DrawerOverlay />
         <DrawerContent width={'80px'}>
            {/* @ts-ignore */}
            <SideBar onClose={onClose} />
         </DrawerContent>
      </Drawer>
   );
};
