'use client';
import { authToken, createMeeting } from '@api';
import {
   Box,
   Flex,
   Grid,
   GridItem,
   Image,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   useColorModeValue,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import DynamicText from '@components/util/DynamicText';
import MessageBox from '@components/util/MessageBox';
import Spinners from '@components/util/Spinners';
import { messageDetailsInitState } from '@config/app';
import AppContext from '@context/StateProvider';
import { useIsOnline } from '@hooks/useIsOnline';
import { pusherClient } from '@libs/pusher';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaMicrophone, FaRegImage, FaRegSmile } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

type ChatBoxProps = {
   name: string;
   imageUrl: string;
   id: string;
   email: string;
};

const ChatBox = ({ name, imageUrl, id }: ChatBoxProps) => {
   const [messages, setMessages] = useState([{ ...messageDetailsInitState }]);
   const [isClicked, setIsClicked] = useState(false);

   const [currentMessage, setCurrentMessage] = useState('');
   const [isTypingState, setIsTypingState] = useState({ status: false, typingUser: '' });

   const router = useRouter();

   const { isLoading, setMessageDetails, setIsLoading } = useContext(AppContext);

   const borderColor = useColorModeValue('light', 'dark');
   const bgColor = useColorModeValue('bgWhite', '#2E333D');
   const textColor = useColorModeValue('#000', '#aaa');
   const chatBoxBG = useColorModeValue('bgWhite', 'dark');

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

      // pusherClient.bind('user-typing', ({ status, typingUser }: { status: boolean; typingUser: string }) => {
      //    setIsTypingState({ status, typingUser });
      // });

      getMessages();
      setIsLoading(false);
      return () => {
         pusherClient.unsubscribe(id);
         pusherClient.unbind('newMessage', messageHandler);
         // pusherClient.unbind('user-typing', () => {});
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

   const getMessages = useCallback(async () => {
      const res = await fetch(`/api/messages/${id}`);
      const data = await res.json();
      setMessages(data.messages);
   }, [id]);

   const openNewTab = async (videoCall: boolean) => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const newWidth = screenWidth * 0.5;
      const newHeight = screenHeight * 0.5;
      const left = (screenWidth - newWidth) / 2;
      const top = (screenHeight - newHeight) / 2;

      const windowFeatures = `width=${newWidth},height=${newHeight},left=${left},top=${top}`;

      const callId = await createMeeting({ token: authToken });
      const url = `/groupcall?conversation_id=${id}&call_id=${callId}&has_video=${videoCall}&user_to_ring=${name}&called_by=${user?.username}`;

      await fetch('/api/video', {
         method: 'POST',
         body: JSON.stringify({
            id,
            callId,
            calledBy: user?.username,
            isVideo: videoCall,
            userToRing: name,
            url,
         }),
      });

      if (callId) {
         open(window.origin + url, 'NewWindow', windowFeatures);
      }
   };

   const addEmoji = (e) => {
      let sym = e.unified.split('-');
      let codesArray: [] = [];
      // @ts-ignore
      sym.forEach((el: string) => codesArray.push('0x' + el));
      let emoji = String.fromCodePoint(...codesArray);
      setCurrentMessage(currentMessage + emoji);
   };

   return (
      <GridItem height={'100vh'}>
         {isLoading ? (
            <Spinners />
         ) : (
            <Grid templateRows={'100px 1fr auto'} height={'100%'}>
               <GridItem borderBottom={borderColor}>
                  <Flex align={'center'} gap='1rem' p='2rem 1.5rem'>
                     <Box
                        fontSize={'1.2rem'}
                        color={textColor}
                        display={{ md: 'none', base: 'block' }}
                        onClick={() => {
                           router.push('/dashboard/messages');
                        }}
                     >
                        <FaArrowLeft />
                     </Box>

                     <Box borderRadius={'50%'} overflow={'hidden'}>
                        <Image width={'40px'} height={'40px'} alt='user img' src={imageUrl} />
                     </Box>
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
                     {/*     <Flex ml={'auto'} align='center' gap='1rem' pr='.8rem' cursor={'pointer'}>
                        <MdVideoCall
                           fontSize={'2rem'}
                           onClick={() => {
                              openNewTab(true);
                           }}
                        />

                        <MdCall
                           fontSize={'1.5rem'}
                           onClick={() => {
                              openNewTab(false);
                           }}
                        />
                     </Flex> */}
                  </Flex>
               </GridItem>
               <Box bg={chatBoxBG} overflowY={'scroll'}>
                  {messages
                     .filter((el) => el.message !== '')
                     .map((msgCnt, idx) => (
                        <MessageBox
                           img={msgCnt.user.imgsrc}
                           name={msgCnt.user.name}
                           message={msgCnt.message}
                           // @ts-ignore
                           key={msgCnt._id || idx + msgCnt.message}
                           isOwnMessage={currentUserEmail === msgCnt.sender.email}
                           sent={msgCnt.sent}
                        />
                     ))}
               </Box>
               <GridItem>
                  <Box p={{ md: '1rem', base: '10px' }}>
                     <InputGroup size={'lg'}>
                        <InputLeftElement pl={{ md: '1rem' }} fontSize={'1.2rem'}>
                           <FaMicrophone color='#aaa' cursor={'pointer'} />
                        </InputLeftElement>
                        <Input
                           pos={'relative'}
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
                           pr={'6.5rem'}
                           value={currentMessage}
                           onChange={(e) => setCurrentMessage(e.target.value)}
                           placeholder={'Type a message'}
                           _placeholder={{ color: '#aaa', fontSize: '.9rem' }}
                           onFocus={async (e) => {
                              setIsClicked(false);
                              // await fetch('/api/typing', {
                              //    method: 'POST',
                              //    body: JSON.stringify({ id, typingUser: user?.username, status: true }),
                              // });
                           }}
                           // onBlur={async (e) => {
                           //    await fetch('/api/typing', {
                           //       method: 'POST',
                           //       body: JSON.stringify({ id, typingUser: user?.username, status: false }),
                           //    });
                           // }}
                        />
                        <InputRightElement mr={'3.5rem'} fontSize={'1.2rem'}>
                           <MdSend
                              color='#aaa'
                              cursor={'pointer'}
                              onClick={() => {
                                 setCurrentMessage('');
                                 currentMessage !== '' && sendMessage();
                              }}
                           />
                        </InputRightElement>
                        <InputRightElement gap='.5rem' mr={'1rem'} fontSize={'1.2rem'}>
                           <FaRegSmile color='#aaa' cursor={'pointer'} onClick={() => setIsClicked(!isClicked)} />

                           {isClicked && (
                              <Box pos={'absolute'} bottom={'3rem'} right={'1rem'}>
                                 <EmojiPicker
                                    width={320}
                                    // width={280}
                                    height={400}
                                    emojiStyle='Google'
                                    theme='dark'
                                    onEmojiClick={addEmoji}
                                 />
                              </Box>
                           )}
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

/* function Call() {
   const { isOpen, onClose, onOpen } = useDisclosure();
   const { id } = useConversationId();

   const pathName = usePathname();
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

   const openTab = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const newWidth = screenWidth * 0.5;
      const newHeight = screenHeight * 0.5;
      const left = (screenWidth - newWidth) / 2;
      const top = (screenHeight - newHeight) / 2;

      const windowFeatures = `width=${newWidth},height=${newHeight},left=${left},top=${top}`;

      open(window.origin + pathName, 'NewWindow', windowFeatures);
   };

   return (
      <>
         <Flex ml={'auto'} align='center' gap='1rem' pr='.8rem' cursor={'pointer'}>
            <MdVideoCall
               fontSize={'2rem'}
               onClick={() => {
                  // onOpen();
                  openTab();
                  // handleClick(null, true, false);
               }}
            />

            <MdCall
               fontSize={'1.5rem'}
               onClick={() => {
                  // onOpen();
                  handleClick(null, false, true);
               }}
            />
         </Flex>

         <Modal closeOnOverlayClick={false} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              
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
*/
