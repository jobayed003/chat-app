import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';

const ChatBox = () => {
  return (
    <Grid templateRows={'100px 1fr'}>
      <Flex
        align={'center'}
        gap='1rem'
        p='1rem'
        borderBottom={'1px solid #ddd'}
      >
        <Box borderRadius={'50%'} overflow={'hidden'}>
          <Image src='/assets/user.jpeg' alt='avatar' width={40} height={40} />
        </Box>
        <Box>
          <Text as='p' m='0'>
            Jobayed
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
