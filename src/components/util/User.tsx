import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { auth } from '@firebase/config';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DynamicText from './DynamicText';

interface ConversationUser {
   name: string;
   imgSrc: string;
   messages?: string[];
}

const User = ({ name, imgSrc, messages }: ConversationUser) => {
   const [isSender, setIsSender] = useState<boolean>(false);

   const messageTextBGColor = useColorModeValue(isSender ? '#2D5EFF' : '#fff', isSender ? 'blue.800' : '#2E333D');
   const textColor = useColorModeValue(isSender ? '#fff' : '#000', isSender ? '#ddd' : 'gray');
   const userName = auth.currentUser?.displayName;
   const friend = 'Hossain';

   useEffect(() => {
      if (userName === name) setIsSender(true);
   }, [userName, name]);

   return (
      <Flex justify={isSender ? 'end' : ''} align={'center'} p={'2rem'} mx='.2rem'>
         <Flex py='1rem' align={'start'} gap='1rem' direction={isSender ? 'row-reverse' : 'row'}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image width={45} height={40} alt='user img' src={imgSrc} />
            </Box>

            <Box textAlign={isSender ? 'right' : 'left'}>
               <DynamicText fontSize='1rem' fontWeight='bold' mb='1rem'>
                  {isSender ? 'You' : name}
               </DynamicText>
               {messages?.map((message, idx) => (
                  <Box
                     key={Math.random()}
                     bg={messageTextBGColor}
                     p='.4rem'
                     mb='.5rem'
                     borderRadius={'10px'}
                     borderTopRightRadius={isSender && idx === 0 ? '0px' : ''}
                     borderTopLeftRadius={!isSender && idx === 0 ? '0px' : ''}
                  >
                     <Text fontSize={'14px'} color={textColor}>
                        {message}
                     </Text>
                  </Box>
               ))}
            </Box>
            <DynamicText color='gray' fontSize='11px'>
               {moment().format('hh:mm a')}
            </DynamicText>
         </Flex>
      </Flex>
   );
};

export default User;
