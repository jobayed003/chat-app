import { Box, Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import { randomName } from '@config/data';
import Image from 'next/image';
import { useState } from 'react';
import { MdMessage, MdSearch } from 'react-icons/md';

const Chats = () => {
   const [pinnedMessages, setPinnedMessages] = useState([]);
   const [messages, setMessages] = useState([]);
   const borderColor = useColorModeValue('light', 'dark');

   return (
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
            {randomName.map((user) => (
               <User
                  key={Math.random()}
                  name={user.name}
                  status={user.status}
                  messageDetails={user.messageDetails}
                  img={user.img}
                  lastActive={'4 minute ago'}
               />
            ))}
         </Box>
      </Grid>
   );
};

export default Chats;

const User = ({ name, img, lastActive, messageDetails, status }: User) => {
   return (
      <Box cursor={'pointer'} _active={{ bg: '#2E333D' }} _hover={{ bg: '#2E333D' }} px='1rem'>
         <Flex justify={'space-between'} align={'center'}>
            <Flex py='1rem' align={'center'} gap='.8rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={45} height={40} alt='user img' src={img} />
               </Box>

               <Box>
                  <DynamicText fontSize='14px'>{name}</DynamicText>
                  <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                     {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails.lastMessages.slice(-1)}
                  </DynamicText>
               </Box>
            </Flex>
            <Flex direction={'column'}>
               <DynamicText fontSize='12px' color={'gray'}>
                  {messageDetails.sent}
               </DynamicText>

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
                     {`${messageDetails.lastMessages.length}`}
                  </DynamicText>
               </Flex>
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
