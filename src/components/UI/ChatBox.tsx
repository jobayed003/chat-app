'use client';
import {
   Box,
   Flex,
   Grid,
   GridItem,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Spinner,
   useColorModeValue,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicImage from '@components/util/DynamicImage';
import DynamicText from '@components/util/DynamicText';
import MessageBox from '@components/util/MessageBox';
import { messageDetailsInitState } from '@config/app';
import AppContext from '@context/StateProvider';
import { useIsOnline } from '@hooks/useIsOnline';
import { pusherClient } from '@libs/pusher';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { FaMicrophone, FaRegImage, FaRegSmile } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

type ChatBoxProps = {
   name: string;
   imageUrl: string;
   id: string;
   email: string;
};

const ChatBox = ({ name, imageUrl, id }: ChatBoxProps) => {
   const borderColor = useColorModeValue('light', 'dark');
   const bgColor = useColorModeValue('bgWhite', '#2E333D');
   const textColor = useColorModeValue('#000ui', '#aaa');
   const chatBoxBG = useColorModeValue('bgWhite', 'dark');
   const [messages, setMessages] = useState([{ ...messageDetailsInitState }]);
   const [currentMessage, setCurrentMessage] = useState('');
   const { isLoading, setMessageDetails, setIsLoading } = useContext(AppContext);

   const isOnline = useIsOnline();
   const { user } = useUser();

   const currentUserEmail = user?.primaryEmailAddress?.emailAddress!;

   useEffect(() => {
      pusherClient.subscribe(id);
      const messageHandler = (data: MessageDetails) => {
         setMessageDetails(data);
         setMessages((prevMessages) => [...prevMessages, data]);
      };
      pusherClient.bind('newMessage', messageHandler);

      setIsLoading(false);
      getMessages();
      return () => {
         pusherClient.unsubscribe(id);
         pusherClient.unbind('newMessage', messageHandler);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const sendMessage = async () => {
      await fetch('/api/messages', {
         method: 'POST',
         body: JSON.stringify({
            id,
            user: { email: currentUserEmail, name: user?.username, imgsrc: user?.imageUrl },
            sender: { email: currentUserEmail, seen: false },
            message: currentMessage,

            sent: moment().format('hh:mm a'),
         }),
      });
      setCurrentMessage('');
   };

   const getMessages = async () => {
      const res = await fetch(`/api/messages/${id}`);
      const data = await res.json();
      setMessages(data.messages);
   };

   return (
      <GridItem height={'100vh'}>
         {isLoading ? (
            <Flex justify={'center'} align={'center'} height={'100vh'}>
               <Spinner size='xl' />
            </Flex>
         ) : (
            <Grid templateRows={'100px 1fr auto'} height={'100%'}>
               <GridItem borderBottom={borderColor}>
                  <Flex align={'center'} gap='1rem' p='2rem 1.5rem'>
                     <DynamicImage
                        sx={{ borderRadius: '50%', overflow: 'hidden' }}
                        imgsrc={imageUrl}
                        width={40}
                        height={40}
                     />
                     <Box>
                        <DynamicText as={'p'} m='0'>
                           {name}
                        </DynamicText>
                        <DynamicText color={'#2F9167'} fontSize={'12px'}>
                           {isOnline ? 'Online' : 'Offline'}
                        </DynamicText>
                     </Box>
                  </Flex>
               </GridItem>
               <Box bg={chatBoxBG} overflowY={'scroll'}>
                  {messages
                     .filter((el) => el.message !== '')
                     .map((msgCnt) => (
                        <MessageBox
                           img={msgCnt.user.imgsrc}
                           name={msgCnt.user.name}
                           message={msgCnt.message}
                           key={msgCnt + msgCnt.user.name}
                           isOwnMessage={currentUserEmail === msgCnt.sender.email}
                           sent={msgCnt.sent}
                        />
                     ))}
               </Box>
               <GridItem>
                  <Box p='1rem'>
                     <InputGroup size={'lg'}>
                        <InputLeftElement fontSize='1rem' pl={'1rem'}>
                           <FaMicrophone color='#aaa' cursor={'pointer'} />
                        </InputLeftElement>
                        <Input
                           color={textColor}
                           border={'none'}
                           bg={bgColor}
                           onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                 setCurrentMessage('');
                                 sendMessage();
                              }
                           }}
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
                           <MdSend
                              color='#aaa'
                              cursor={'pointer'}
                              onClick={() => {
                                 setCurrentMessage('');
                                 sendMessage();
                              }}
                           />
                        </InputRightElement>
                        <InputRightElement gap='.5rem' mr='1rem'>
                           <FaRegSmile color='#aaa' cursor={'pointer'} />
                           <FaRegImage color='#aaa' cursor={'pointer'} />
                        </InputRightElement>
                     </InputGroup>
                  </Box>
               </GridItem>
            </Grid>
         )}
      </GridItem>
   );
};

export default ChatBox;
