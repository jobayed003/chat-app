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
import { ChatUser } from '@components/UI/ChatUser';
import DynamicText from '@components/UI/DynamicText';
import { SearchBar } from '@components/UI/SearchBar';
import useConversationId from '@hooks/useConversationId';
import { useIsOnline } from '@hooks/useIsOnline';
import { compareDates } from '@libs/compareDates';
import { pusherClient } from '@libs/pusher';
import { useParams } from 'next/navigation';
import { RefObject, useEffect, useRef, useState } from 'react';
import { MdMenu, MdMessage } from 'react-icons/md';
import SideBar from '../Dashboard/SideBar';

const Chats = ({ users }: { users: CurrentUser[] }) => {
   const [openSearch, setOpenSearch] = useState(false);

   const [messages, setMessages] = useState({
      message: '',
      sent: '',
   });
   const [showSkeleton, setShowSkeleton] = useState(true);

   // @ts-ignore
   const { conversationId } = useParams();

   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();

   const isOnline = useIsOnline();

   const borderColor = useColorModeValue('light', 'dark');
   const { isLoaded, user } = useUser();
   const { id } = useConversationId();

   const btnRef = useRef<HTMLButtonElement>(null);

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

               {/* Sidenav for mobile view */}
               <SideNav isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

               <DynamicText fontSize={'2rem'}>Messages</DynamicText>
               {/* {openSearch && (
                  <Input placeholder='Type a user name' border={'none'} _focusVisible={{ boxShadow: 'none' }} />
               )} */}
               {/* <Box fontSize={'1.5rem'}>
                  <MdSearch cursor={'pointer'} onClick={() => setOpenSearch(!openSearch)} />
               </Box> */}

               <SearchBar users={users} />
            </Flex>
            <Box>
               <Flex align={'center'} gap='.5rem' color={'grayText'} fontSize={'.8rem'} p={'1.5rem'}>
                  <MdMessage />
                  <Text>All Messages</Text>
               </Flex>

               <Box px='1rem'>
                  {user &&
                     users.map((signedUser) => (
                        <ChatUser
                           key={Math.random()}
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
                           currentUser={user}
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
