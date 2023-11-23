// @ts-nocheck
'use client';
import { Box, Flex, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdMessage, MdSearch } from 'react-icons/md';

const Chats = () => {
   const [pinnedMessages, setPinnedMessages] = useState([]);
   const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState<[]>([]);

   const borderColor = useColorModeValue('light', 'dark');
   const { user } = useUser();

   const createUser = async () => {
      const response = await fetch('/api/users', {
         method: 'POST',
         body: JSON.stringify({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            userName: user?.username,
            imageUrl: user?.imageUrl,
            userId: user?.id,
         }),
      });

      if (response.ok) {
         console.log('Saved');
      }
   };

   useEffect(() => {
      createUser();
      const fetchUsers = async () => {
         const response = await fetch('/api/users');

         const users = await response.json();
         setUsers(users.filter((el) => el.id !== user.id));
      };

      fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

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

   return (
      <GridItem w='100%' borderRight={borderColor} h='100vh'>
         <Grid templateRows={'100px 1fr'}>
            <Flex borderBlockEnd={borderColor} align={'center'} p={'1.5rem'} justifyContent={'space-between'}>
               <DynamicText fontSize='2rem'>Messages</DynamicText>
               <Flex align={'center'} fontSize={'1.5rem'} gap={'1rem'} color={'grayText'}>
                  {/* <Box borderRadius={'50%'} boxShadow={'2xl'} cursor={'pointer'}>
            <MdEdit />
          </Box> */}
                  <Box cursor={'pointer'}>
                     <MdSearch fontSize={'1.5rem'} />
                  </Box>
               </Flex>
            </Flex>
            <Box>
               <Flex align={'center'} gap='.5rem' color={'grayText'} fontSize={'.8rem'} p='1.5rem'>
                  <MdMessage />
                  <Text>All Messages</Text>
               </Flex>
               {user &&
                  users.map((user) => (
                     <ChatUser
                        key={Math.random()}
                        name={user.username}
                        status={'online'}
                        img={user.imageUrl}
                        messageDetails={{
                           lastMessages: 'Joined ' + compareDates(user.createdAt).difference.humanize() + ' ago',
                        }}
                        lastActive={compareDates(1700746673468).difference.humanize()}
                        userId={user.id}
                     />
                  ))}
            </Box>
         </Grid>
      </GridItem>
   );
};

export default Chats;

const ChatUser = ({ name, img, lastActive, messageDetails, status, userId }: User) => {
   const router = useRouter();
   return (
      <Box
         cursor={'pointer'}
         _active={{ bg: '#2E333D' }}
         _hover={{ bg: '#2E333D' }}
         px='1rem'
         onClick={() => router.push(`/dashboard/messages/${userId}`)}
      >
         <Flex justify={'space-between'} align={'center'}>
            <Flex py='1rem' align={'center'} gap='.8rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={45} height={40} alt='user img' src={img} />
               </Box>

               <Box>
                  <DynamicText fontSize='14px'>{name}</DynamicText>
                  {/* <DynamicText color={'gray'} fontSize='12px'>
                     {lastActive}
                  </DynamicText> */}
                  <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                     {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails?.lastMessages}
                  </DynamicText>
               </Box>
            </Flex>
            <Flex direction={'column'}>
               <DynamicText fontSize='12px' color={'gray'}>
                  {messageDetails?.sent}
               </DynamicText>

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
