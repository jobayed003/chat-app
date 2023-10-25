import { Box, Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

const ChatBox = () => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');
   const borderColor = useColorModeValue('light', 'dark');

   return (
      <Grid templateRows={'100px 1fr'}>
         <Flex align={'center'} gap='1rem' p='1rem' borderBottom={borderColor}>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image src='/assets/user.jpeg' alt='avatar' width={40} height={40} />
            </Box>
            <Box>
               <Text color={textColor} as='p' m='0'>
                  Hossain
               </Text>
               <Text color={'#2F9167'} fontSize={'12px'}>
                  {'Typing...'}
               </Text>
               {/* <Text fontSize={'12px'} color={'#aaa'}>
            {messageDetails.messageStatus === 'typing'
              ? 'Typing'
              : messageDetails.lastMessages.slice(-1)}
          </Text> */}
            </Box>
         </Flex>
      </Grid>
   );
};

export default ChatBox;
