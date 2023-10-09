import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiFillMessage, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { MdFolderOpen, MdVerifiedUser } from 'react-icons/md';

const SideBar = () => {
  return (
    <Flex color={'#000'} direction={'column'} h='100%'>
      <Box
        borderBottom={'1px solid #eee'}
        display={'flex'}
        fontSize={'2.5rem'}
        alignItems={'center'}
        p='1rem'
        px='1.5rem'
      >
        <AiFillMessage color='blue' />
        <Text marginLeft={'.5rem'}>chatIT</Text>
      </Box>
      <Flex h='100%' align={'center'}>
        <Menus />
      </Flex>
      <Flex align={'center'}>
        <Box p='1rem'>
          <Image src='/assets/icons/user.png' alt='avatar' width={30} height={30} />
        </Box>
        <Box>
          <Text as='p' m='0'>
            John
          </Text>
          <Link href={'/'}>
            <Text color={'gray.500'} fontSize={'.9rem'}>
              Logout
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SideBar;

const Menus = () => {
  const router = useRouter();

  const option = [
    { name: 'Messages', icon: <AiOutlineMessage fontSize={'1.3rem'} /> },
    { name: 'Files', icon: <MdFolderOpen fontSize={'1.3rem'} /> },
    { name: 'Settings', icon: <AiOutlineSetting fontSize={'1.3rem'} /> },
  ];

  return (
    <Box p='2rem' pt='0'>
      {option.map((el) => (
        <Flex
          color={'#000'}
          key={Math.random()}
          align={'center'}
          gap={4}
          py='2rem'
          cursor={'pointer'}
          onClick={() => router.push(`/dashboard/${el.name.toLowerCase()}`)}
        >
          <Box>{el.icon}</Box>
          <Box fontSize={'1.2rem'}>{el.name}</Box>
        </Flex>
      ))}
    </Box>
  );
};
