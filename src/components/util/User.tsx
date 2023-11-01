import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
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

   const messageTextBGColor = useColorModeValue(isSender ? 'blue' : '#fff', '#2E333D');
   const textColor = useColorModeValue(isSender ? '#fff' : '#000', 'gray');
   const userName = 'John';
   const friend = 'Hossain';

   useEffect(() => {
      if (userName === name) setIsSender(true);
   }, [name]);

   return (
      <Flex justify={isSender ? 'end' : ''} align={'center'} p={'2rem'} mx='.2rem'>
         <Flex py='1rem' align={'start'} gap='1rem' direction={isSender ? 'row-reverse' : 'row'}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image width={45} height={40} alt='user img' src={imgSrc} />
            </Box>

            <Box textAlign={isSender ? 'right' : 'left'}>
               <DynamicText fontSize='1rem' fontWeight='bold' value={isSender ? 'You' : name} mb='1rem' />
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
                     <DynamicText fontSize={'14px'} color={textColor} value={message} />
                  </Box>
               ))}
            </Box>
            <DynamicText color='gray' fontSize='11px' value={moment().format('hh:mm a')} />
         </Flex>
      </Flex>
   );
};

export default User;
