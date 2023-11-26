import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import DynamicText from './DynamicText';

interface MessageBoxTypes {
   name: string;
   message?: string;
   isOwnMessage: boolean;
   img: string;
   sent: string;
}

const MessageBox = ({ message, isOwnMessage, img, name, sent }: MessageBoxTypes) => {
   const messageTextBGColor = useColorModeValue(
      isOwnMessage ? '#2D5EFF' : '#fff',
      isOwnMessage ? 'blue.800' : '#2E333D'
   );
   const bottomRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
   }, []);

   const textColor = useColorModeValue(isOwnMessage ? '#fff' : '#000', '#fff');

   return (
      <Flex justify={isOwnMessage ? 'end' : ''} align={'center'} px={'2rem'} mx='.2rem' ref={bottomRef}>
         <Flex py='1rem' align={'start'} gap='1rem' direction={isOwnMessage ? 'row-reverse' : 'row'}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image width={45} height={40} alt='user img' src={img} />
            </Box>

            <Box textAlign={isOwnMessage ? 'right' : 'left'}>
               <DynamicText fontSize='1rem' fontWeight='bold' mb='1rem'>
                  {isOwnMessage ? 'You' : name}
               </DynamicText>

               <Box
                  key={Math.random()}
                  bg={messageTextBGColor}
                  p='.4rem'
                  mb='.5rem'
                  borderRadius={'10px'}
                  borderTopRightRadius={isOwnMessage ? '0px' : ''}
                  borderTopLeftRadius={!isOwnMessage ? '0px' : ''}
               >
                  <Text fontSize={'14px'} color={textColor}>
                     {message}
                  </Text>
               </Box>
            </Box>
            <DynamicText color='gray' fontSize='11px'>
               {sent}
            </DynamicText>
         </Flex>
      </Flex>
   );
};

export default MessageBox;
