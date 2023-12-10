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
import ChatUser from '@components/UI/Message/ChatUser';
import { SearchBar } from '@components/UI/Message/SearchBar';
import DynamicText from '@components/UI/Util/DynamicText';
import AuthContext from '@context/AuthProvider';
import useConversationId from '@hooks/useConversationId';
import { useIsOnline } from '@hooks/useIsOnline';
import { compareDates } from '@libs/compareDates';
import { pusherClient } from '@libs/pusher';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MdMenu, MdMessage } from 'react-icons/md';
import SideBar from '../Dashboard/SideBar';

const Chats = ({ users }: { users: CurrentUser[] }) => {
   const [messages, setMessages] = useState({
      message: '',
      sent: '',
   });
   const [showSkeleton, setShowSkeleton] = useState(true);

   const { currentUser } = useContext(AuthContext);

   // @ts-ignore
   const { conversationId } = useParams();

   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const isOnline = useIsOnline();

   const borderColor = useColorModeValue('light', 'dark');
   const { isLoaded } = useUser();
   const { id } = useConversationId();

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
   }, [isLoaded, showSkeleton, toast]);

   return (
      <GridItem
         w='100%'
         borderRight={borderColor}
         h={'100dvh'}
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
               <Box display={{ base: 'block', md: 'none' }} fontSize={'1.5rem'} onClick={isOpen ? onClose : onOpen}>
                  <MdMenu />
               </Box>

               {/* Sidenav for mobile view */}
               <SideNav user={currentUser} isOpen={isOpen} onClose={onClose} />

               <DynamicText fontSize={'2rem'}>Messages</DynamicText>

               <SearchBar users={users} />
            </Flex>
            <Box>
               <Flex align={'center'} gap='.5rem' color={'grayText'} fontSize={'.8rem'} p={'1.5rem'}>
                  <MdMessage />
                  <Text>All Messages</Text>
               </Flex>

               <Box px='1rem'>
                  {currentUser &&
                     users.map((signedUser) => (
                        <ChatUser
                           key={signedUser.id}
                           name={signedUser.userName}
                           email={signedUser.emailAddress!}
                           status={isOnline ? 'Online' : 'Offline'}
                           img={signedUser.imageUrl}
                           messageDetails={{
                              sent: messages.sent,
                              lastMessage:
                                 messages.message ||
                                 'Joined ' + compareDates(+signedUser.createdAt!).difference.humanize() + ' ago',
                           }}
                           lastActive={compareDates(1700746673468).difference.humanize()}
                           userId={signedUser.id}
                           currentUser={currentUser}
                        />
                     ))}
               </Box>
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

const SideNav = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: CurrentUser }) => {
   return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
         <DrawerOverlay />
         <DrawerContent width={'auto'}>
            <SideBar user={user} onClose={onClose} />
         </DrawerContent>
      </Drawer>
   );
};
