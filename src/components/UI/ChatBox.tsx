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
   useColorModeValue,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { useIsOnline } from '@components/hooks/useIsOnline';
import DynamicText from '@components/util/DynamicText';
import MessageBox from '@components/util/MessageBox';
import { messageDetailsInitState } from '@config/app';
import AppContext from '@context/StateProvider';
import { pusherClient } from '@libs/pusher';
import moment from 'moment';
import Image from 'next/image';
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
   const [messages, setMessages] = useState([{ ...messageDetailsInitState }]);
   const [currentMessage, setCurrentMessage] = useState('');
   const { setMessageDetails } = useContext(AppContext);

   const isOnline = useIsOnline();
   const { user } = useUser();

   const currentUserEmail = user?.primaryEmailAddress?.emailAddress!;

   useEffect(() => {
      pusherClient.subscribe('test');

      const messageHandler = (data: MessageDetails) => {
         setMessageDetails(data);
         setMessages((prevMessages) => [...prevMessages, data]);
      };

      pusherClient.bind('newMessage', messageHandler);

      return () => {
         pusherClient.unsubscribe('test');
         pusherClient.unbind('newMessage', messageHandler);
      };
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

   return (
      <GridItem height={'100vh'}>
         <Grid templateRows={'100px 1fr auto'} height={'100%'}>
            <GridItem borderBottom={borderColor}>
               <Flex align={'center'} gap='1rem' p='2rem 1.5rem'>
                  <Box borderRadius={'50%'} overflow={'hidden'}>
                     <Image src={imageUrl} alt='avatar' width={40} height={40} />
                  </Box>
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
            <Box bg={useColorModeValue('bgWhite', 'dark')} overflowY={'scroll'}>
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
                        color='#aaa'
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
      </GridItem>
   );
};

export default ChatBox;

// const messages = ['Hello Test', 'Test', 'Send Me Message'];
