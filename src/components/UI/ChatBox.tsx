import {
   Box,
   Flex,
   Grid,
   GridItem,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   useColorModeValue,
} from '@chakra-ui/react';
import DynamicText from '@components/util/DynamicText';
import User from '@components/util/User';
import AuthContext from '@context/AuthProvider';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { FaMicrophone, FaRegImage, FaRegSmile } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { io } from 'socket.io-client';

const ChatBox = () => {
   const borderColor = useColorModeValue('light', 'dark');
   const bgColor = useColorModeValue('bgWhite', '#2E333D');
   const { userDetails } = useContext(AuthContext);
   const [messages, setMessages] = useState([]);
   const [currentMessage, setCurrentMessage] = useState('');

   const socket = io();
   // const socket = socketClient();

   // Replace with your server URL
   useEffect(() => {
      // Create a socket connection
      // socket.on('connect', () => {
      //    console.log('Connected to Socket.IO server');
      // });

      // // Listen for incoming messages
      // socket.on('receive', (message) => {
      //    console.log(message);
      //    // Update message state
      //    setMessages((prevMessages) => [...prevMessages, message]);
      // });

      socketInit();
      // Clean up the socket connection on unmount
      return () => {
         socket.disconnect();
      };
   }, []);

   async function socketInit() {
      // await fetch('/api/socket');

      socket.on('receive', (message: string) => {
         console.log(message);
      });
   }

   const sendMessage = () => {
      // Send the message to the server

      socket.emit('send', currentMessage);
      // Clear the currentMessage state
      setCurrentMessage('');
   };

   return (
      <Grid templateRows={'100px 1fr auto'} height={'100%'}>
         <GridItem borderBottom={borderColor}>
            <Flex align={'center'} gap='1rem' p='2rem 1.5rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image src='/assets/user.jpeg' alt='avatar' width={40} height={40} />
               </Box>
               <Box>
                  <DynamicText as={'p'} m='0'>
                     Hossain
                  </DynamicText>
                  <DynamicText color={'#2F9167'} fontSize={'12px'}>
                     Online
                  </DynamicText>

                  {/* <Text fontSize={'12px'} color={'#aaa'}>
            {messageDetails.messageStatus === 'typing'
              ? 'Typing'
              : messageDetails.lastMessages.slice(-1)}
          </Text> */}
               </Box>
            </Flex>
         </GridItem>
         <Box bg={useColorModeValue('bgWhite', 'dark')}>
            <Box>
               <User name='Hossain' imgSrc={'/assets/user.jpeg'} messages={messages} />
               {/* <User name='John' imgSrc={'/assets/user.jpeg'} messages={messages} /> */}
               {/* <User name={userDetails.name} imgSrc={userDetails.profilePic} messages={messages} /> */}
               {messages.map((message, index) => (
                  <p key={index}>{message}</p>
               ))}
            </Box>
         </Box>
         <GridItem>
            <Box p='1rem'>
               <InputGroup size={'lg'}>
                  <InputLeftElement fontSize='1rem' pl={'1rem'}>
                     <FaMicrophone color='#aaa' cursor={'pointer'} />
                  </InputLeftElement>
                  <Input
                     color='#aaa'
                     border={'none'}
                     bg={bgColor}
                     _focusVisible={{ boxShadow: 'none' }}
                     sx={{
                        borderRadius: '50px',
                     }}
                     pr={'6.5rem'}
                     value={currentMessage}
                     onChange={(e) => setCurrentMessage(e.target.value)}
                     placeholder={'Type a message'}
                     _placeholder={{ color: '#aaa', fontSize: '.9rem' }}
                  />
                  <InputRightElement mr='3.5rem'>
                     <MdSend color='#aaa' cursor={'pointer'} onClick={(e) => sendMessage()} />
                  </InputRightElement>
                  <InputRightElement gap='.5rem' mr='1rem'>
                     <FaRegSmile color='#aaa' cursor={'pointer'} />
                     <FaRegImage color='#aaa' cursor={'pointer'} />
                  </InputRightElement>
               </InputGroup>
            </Box>
         </GridItem>
      </Grid>
   );
};

export default ChatBox;

const messages = ['Hello Test', 'Test', 'Send Me Message'];
