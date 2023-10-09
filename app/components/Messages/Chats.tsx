import { Box, Divider, Flex, Grid, Text } from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { MdLocationPin, MdMessage, MdSearch } from 'react-icons/md';

const Chats = () => {
  const [pinnedMessages, setPinnedMessages] = useState([]);

  return (
    <Grid templateRows={'100px 1fr'}>
      <Flex
        borderBlockEnd={'1px solid #ddd'}
        align={'center'}
        p={'1.5rem'}
        justifyContent={'space-between'}
      >
        <Text fontSize={'2rem'}>Messages</Text>
        <Flex align={'center'} fontSize={'1.5rem'} gap={'1rem'} color={'#aaaa'}>
          {/* <Box borderRadius={'50%'} boxShadow={'2xl'} cursor={'pointer'}>
            <MdEdit />
          </Box> */}
          <Box cursor={'pointer'}>
            <MdSearch fontSize={'1.5rem'} />
          </Box>
        </Flex>
      </Flex>
      <Divider />
      {pinnedMessages.length > 0 && <PinnedMessages />}
      <Box p='1.5rem'>
        <Flex
          align={'center'}
          gap='.5rem'
          color={'gray.500'}
          fontSize={'.8rem'}
        >
          <MdMessage />
          <Text>All Messages</Text>
        </Flex>
        {randomName.map((user) => (
          <User
            key={Math.random()}
            name={user.name}
            status={user.status}
            messageDetails={user.messageDetails}
            img={user.img}
            lastActive={'d'}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default Chats;

const PinnedMessages = () => {
  return (
    <Box p='1.5rem'>
      <Flex align={'center'} gap='.5rem' color={'gray.500'} fontSize={'.8rem'}>
        <MdLocationPin />
        <Text>Pinned Message</Text>
      </Flex>
    </Box>
  );
};

const User: React.FC<User> = ({
  name,
  img,
  lastActive,
  messageDetails,
  status,
}) => {
  return (
    <Box>
      <Flex justify={'space-between'} align={'center'}>
        <Flex py='1rem' align={'center'} gap='.8rem'>
          <Box borderRadius={'50%'} overflow={'hidden'}>
            <Image width={45} height={40} alt='user img' src={img} />
          </Box>

          <Box>
            <Text fontSize={'14px'}>{name}</Text>
            <Text
              fontSize={'12px'}
              color={
                messageDetails.messageStatus === 'typing' ? '#2F9167' : '#aaa'
              }
            >
              {messageDetails.messageStatus === 'typing'
                ? 'Typing...'
                : messageDetails.lastMessages.slice(-1)}
            </Text>
          </Box>
        </Flex>
        <Flex direction={'column'}>
          <Text fontSize={'12px'} color={'#aaa'}>
            {messageDetails.sent}
          </Text>

          <Flex
            bg={'#D34242'}
            borderRadius={'50%'}
            align={'center'}
            justify={'center'}
            alignSelf={'end'}
            w='15px'
            h='15px'
          >
            <Text fontSize={'12px'} color={'#fff'}>
              {messageDetails.lastMessages.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

const randomName = [
  {
    name: 'Jobayed',
    status: 'online',
    messageDetails: {
      messageStatus: '',
      lastMessages: ['Hey I wrote you a message', 'Hey man reply me !!!'],
      sent: moment().format('h:mm a'),
    },
    img: '/assets/user.jpeg',
    lastActive: 'Active 1min ago',
  },

  {
    name: 'Hossain',
    status: 'online',
    messageDetails: {
      messageStatus: 'typing',
      lastMessages: [],
      sent: moment().format('h:mm a'),
    },
    img: '/assets/user.jpeg',
    lastActive: 'Active 1min ago',
  },
  {
    name: 'Hossain',
    status: 'online',
    messageDetails: {
      messageStatus: '',
      lastMessages: ['Hey I wrote you a message', 'Hello??'],
      sent: moment().format('h:mm a'),
    },
    img: '/assets/user.jpeg',
    lastActive: 'Active 1min ago',
  },
];

type User = {
  name: string;
  img: string;
  lastActive: string;
  messageDetails: {
    messageStatus: string;
    lastMessages: string[];
    sent: string;
  };
  status: string;
};
