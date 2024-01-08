'use client';
import {
   Box,
   Drawer,
   DrawerContent,
   DrawerOverlay,
   Flex,
   Grid,
   GridItem,
   Text,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react';
import ConversationDetails from '@components/UI/Message/ConversationDetails';
import { SearchBar } from '@components/UI/Message/SearchBar';
import DynamicText from '@components/UI/Util/DynamicText';
import { useAuthState } from '@context/AuthProvider';
import useConversationId from '@hooks/useConversationId';
import { useEffect } from 'react';
import { MdMenu, MdMessage } from 'react-icons/md';
import SideBar from '../Dashboard/SideBar';

const Chats = ({ users, conversations }: { users: CurrentUser[]; conversations: ConversationDetails[] }) => {
   const { currentUser } = useAuthState();

   const { isOpen, onOpen, onClose } = useDisclosure();

   const borderColor = useColorModeValue('light', 'dark');
   const { id } = useConversationId();

   useEffect(() => {
      const getConversations = async () => {
         const res = await fetch('/api/user-conversations', { next: { revalidate: 5 } });

         const data = await res.json();
         // console.log(data);
      };

      getConversations();
   }, []);

   return (
      <GridItem w='100%' borderRight={borderColor} h={'100dvh'} display={{ base: id ? 'none' : 'block', md: 'block' }}>
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
                     conversations.map((curConversation) => (
                        <ConversationDetails key={curConversation.conversationId} {...curConversation} />
                     ))}
               </Box>

               {users.length === 0 && (
                  <Flex justify='center'>
                     <DynamicText fontSize={'1.5rem'}>No conversation found</DynamicText>
                  </Flex>
               )}
            </Box>
         </Grid>
      </GridItem>
   );
};

export default Chats;

const SideNav = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: CurrentUser }) => {
   return (
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} size={'xs'}>
         <DrawerOverlay />
         <DrawerContent width={'auto'}>
            <SideBar user={user} onClose={onClose} />
         </DrawerContent>
      </Drawer>
   );
};
