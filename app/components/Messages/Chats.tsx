import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { MdLocationPin, MdMessage, MdSearch } from 'react-icons/md';

const Chats = () => {
  const [pinnedMessages, setPinnedMessages] = useState([]);

  return (
    <Box>
      <Flex justify={'space-between'} align={'center'} p='1rem'>
        <Text as='h2' fontSize={'2.5rem'}>
          Chats
        </Text>
        <Flex align={'center'} fontSize={'1.5rem'} gap={'1rem'} color={'#ddd'}>
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
        <Flex align={'center'} gap='.5rem' color={'gray.500'} fontSize={'.8rem'}>
          <MdMessage />
          <Text>All Messages</Text>
        </Flex>
        {randomName.map((user) => (
          <User
            key={Math.random()}
            name={user.name}
            status={user.status}
            messageDetails={user.messageDetails}
            img={user.img}lastActive={'d'}
          />
        ))}
      </Box>
    </Box>
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

const User = ({ name, img, lastActive, messageDetails, status }) => {
  return (
    <Box>
      <Flex>
        <Box px='.1rem' borderRadius={'5px'} overflow={'hidden'}>
          <Image width={40} height={30} alt='user img' src={img} />
        </Box>
        <Box>
          <Text>{name}</Text>
          <Text>
            {messageDetails.messageStatus === 'typing' ? 'Typing' : messageDetails.lastMessage}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const randomName = [
  {
    name: 'Jobayed',
    status: 'online',
    messageDetails: {
      messageStatus: 'typing',
      lastMessage: 'Hey I wrote you a message',
      sent: Date.now(),
    },
    img: '/assets/user.png',
  },

  {
    name: 'Hossain',
    status: 'online',
    messageDetails: {
      messageStatus: 'typing',
      lastMessage: 'Hey I wrote you a message',
      sent: Date.now(),
    },
    img: '/assets/user.png',
  },
];
