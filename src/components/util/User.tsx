import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import DynamicText from './DynamicText';

interface ConversationUser {
   name: string;
   imgSrc: string;
   messages: string[];
}

const User = ({ name, imgSrc, messages }: ConversationUser) => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');
   const userName = 'John';
   const friend = 'Hossain';

   return (
      <Flex justify={userName === name ? 'end' : ''} align={'center'} p={'2rem'} mx='..2rem'>
         <Flex
            py='1rem'
            align={'center'}
            gap='.8rem'
            direction={userName === name ? 'row-reverse' : 'row'}
         >
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image width={45} height={40} alt='user img' src={imgSrc} />
            </Box>

            <Box>
               <DynamicText
                  fontSize='1rem'
                  fontWeight='bold'
                  value={userName === name ? 'You' : name}
               />
               {/* {messages.map((message) => (
                  <DynamicText
                     fontSize={'12px'}
                     color={'gray'}
                     value={message}
                     key={Math.random()}
                  />
               ))} */}
            </Box>
         </Flex>
      </Flex>
   );
};

export default User;
