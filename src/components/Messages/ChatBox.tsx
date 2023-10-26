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
import Image from 'next/image';
import { FaMicrophone, FaRegImage, FaRegSmile } from 'react-icons/fa';

const ChatBox = () => {
   const borderColor = useColorModeValue('light', 'dark');
   const bgColor = useColorModeValue('bgColor', 'dark');

   return (
      <Grid templateRows={'100px 1fr auto'} height={'100%'}>
         <GridItem borderBottom={borderColor}>
            <Flex align={'center'} gap='1rem' p='2rem 1.5rem'>
               <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image src='/assets/user.jpeg' alt='avatar' width={40} height={40} />
               </Box>
               <Box>
                  <DynamicText as={'p'} m='0' value={'Hossain'} />
                  <DynamicText color={'#2F9167'} fontSize={'12px'} value={'Typing...'} />

                  {/* <Text fontSize={'12px'} color={'#aaa'}>
            {messageDetails.messageStatus === 'typing'
              ? 'Typing'
              : messageDetails.lastMessages.slice(-1)}
          </Text> */}
               </Box>
            </Flex>
         </GridItem>
         <Box bg={bgColor}>
            <Box>
               <User name='Hossain' imgSrc={'/assets/user.jpeg'} messages={messages} />
               <User name='John' imgSrc={'/assets/user.jpeg'} messages={messages} />
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
                     bg={'bgColor'}
                     sx={{
                        borderRadius: '50px',
                     }}
                     placeholder={'Type a message'}
                     _placeholder={{ color: '#aaa', fontSize: '.9rem' }}
                  />
                  <InputRightElement fontSize='1rem' gap={'1rem'} mr='1rem'>
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
