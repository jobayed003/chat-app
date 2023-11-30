'use client';
import { authToken, createMeeting } from '@api';
import {
   Box,
   Button,
   Flex,
   Grid,
   GridItem,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalOverlay,
   useColorModeValue,
   useDisclosure,
   useMediaQuery,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicImage from '@components/util/DynamicImage';
import DynamicText from '@components/util/DynamicText';
import MessageBox from '@components/util/MessageBox';
import Spinners from '@components/util/Spinners';
import { messageDetailsInitState } from '@config/app';
import AppContext from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import { useIsOnline } from '@hooks/useIsOnline';
import { pusherClient } from '@libs/pusher';
import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaMicrophone, FaRegImage, FaRegSmile } from 'react-icons/fa';
import { MdCall, MdSend, MdVideoCall } from 'react-icons/md';
import MakeCall from './Video';

type ChatBoxProps = {
   name: string;
   imageUrl: string;
   id: string;
   email: string;
};

const ChatBox = ({ name, imageUrl, id }: ChatBoxProps) => {
   const [messages, setMessages] = useState([{ ...messageDetailsInitState }]);
   const [currentMessage, setCurrentMessage] = useState('');

   const [isTypingState, setIsTypingState] = useState({ status: false, typingUser: '' });

   const { isLoading, setMessageDetails, setIsLoading } = useContext(AppContext);

   const borderColor = useColorModeValue('light', 'dark');
   const bgColor = useColorModeValue('bgWhite', '#2E333D');
   const textColor = useColorModeValue('#000', '#aaa');
   const chatBoxBG = useColorModeValue('bgWhite', 'dark');
   const [isSmallerThan768] = useMediaQuery('(max-width: 768px)', {
      ssr: true,
      fallback: false,
   });

   const isOnline = useIsOnline();
   const { user } = useUser();

   const currentUserEmail = user?.primaryEmailAddress?.emailAddress!;

   useEffect(() => {
      const messageHandler = (data: MessageDetails) => {
         setMessageDetails(data);
         setMessages((prevMessages) => [...prevMessages, data]);
      };

      pusherClient.subscribe(id);
      pusherClient.bind('newMessage', messageHandler);

      pusherClient.bind('user-typing', ({ status, typingUser }: { status: boolean; typingUser: string }) => {
         setIsTypingState({ status, typingUser });
      });

      setIsLoading(false);
      getMessages();

      return () => {
         pusherClient.unsubscribe(id);
         pusherClient.unbind('newMessage', messageHandler);
         pusherClient.unbind('user-typing', () => {});
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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

   console.log('hello from chatbox');

   const getMessages = async () => {
      const res = await fetch(`/api/messages/${id}`);
      const data = await res.json();
      setMessages(data.messages);
   };

   return (
      <GridItem height={'100vh'}>
         {isLoading ? (
            <Spinners />
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
                           {isTypingState.status && isTypingState.typingUser === name
                              ? 'Typing...'
                              : isOnline && 'Online'}
                           {!isOnline && !isTypingState.status && 'Offline'}
                        </DynamicText>
                     </Box>

                     <Call />
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
                           key={msgCnt.user.name + Math.random()}
                           isOwnMessage={currentUserEmail === msgCnt.sender.email}
                           sent={msgCnt.sent}
                        />
                     ))}
               </Box>
               <GridItem>
                  <Box p={{ md: '1rem', base: '10px' }}>
                     <InputGroup size={isSmallerThan768 ? 'sm' : 'lg'}>
                        <InputLeftElement pl={{ md: '1rem' }} fontSize={{ md: '1.2rem', base: '14px' }}>
                           <FaMicrophone color='#aaa' cursor={'pointer'} />
                        </InputLeftElement>
                        <Input
                           color={textColor}
                           border={'none'}
                           bg={bgColor}
                           onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                 setCurrentMessage('');
                                 currentMessage !== '' && sendMessage();
                              }
                           }}
                           _focusVisible={{ boxShadow: 'none' }}
                           borderRadius={{ md: '50px', base: '10px' }}
                           pr={{ md: '6.5rem', base: '4.5rem' }}
                           value={currentMessage}
                           onChange={(e) => setCurrentMessage(e.target.value)}
                           placeholder={'Type a message'}
                           _placeholder={{ color: '#aaa', fontSize: '.9rem' }}
                           onFocus={async (e) => {
                              await fetch('/api/typing', {
                                 method: 'POST',
                                 body: JSON.stringify({ id, typingUser: user?.username, status: true }),
                              });
                           }}
                           onBlur={async (e) => {
                              await fetch('/api/typing', {
                                 method: 'POST',
                                 body: JSON.stringify({ id, typingUser: user?.username, status: false }),
                              });
                           }}
                        />
                        <InputRightElement
                           mr={{ md: '3.5rem', base: '2.5rem' }}
                           fontSize={{ md: '1.2rem', base: '14px' }}
                        >
                           <MdSend
                              color='#aaa'
                              cursor={'pointer'}
                              onClick={() => {
                                 setCurrentMessage('');
                                 currentMessage !== '' && sendMessage();
                              }}
                           />
                        </InputRightElement>
                        <InputRightElement
                           gap='.5rem'
                           mr={{ md: '1rem', base: '.5rem' }}
                           fontSize={{ md: '1.2rem', base: '14px' }}
                        >
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

function Call() {
   const { isOpen, onClose, onOpen } = useDisclosure();
   const { id } = useConversationId();

   const handleClick = useCallback(
      async (ID: string | null, videoCall: boolean, audioCall: boolean) => {
         const meetId = ID == null ? await createMeeting({ token: authToken }) : ID;

         await fetch('/api/video', {
            method: 'POST',
            body: JSON.stringify({ id, meetingId: meetId, videoCall, audioCall }),
         });
      },
      [id]
   );
   return (
      <>
         <Flex ml={'auto'} align='center' gap='1rem' px='2rem' cursor={'pointer'}>
            <MdVideoCall
               fontSize={'2rem'}
               onClick={() => {
                  onOpen();
                  handleClick(null, true, false);
               }}
            />

            <MdCall
               fontSize={'1.5rem'}
               onClick={() => {
                  onOpen();
                  handleClick(null, false, true);
               }}
            />
         </Flex>

         <Modal closeOnOverlayClick={false} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               {/* <ModalCloseButton /> */}
               <ModalBody>
                  <MakeCall />
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Close
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}
