import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import { MdFolderOpen } from 'react-icons/md';

const SideBar = () => {
  return (
    <Grid templateRows={'100px auto'} borderRight={'1px solid #ddd'} h='100%'>
      <Box
        borderBottom={'1px solid #ddd'}
        display={'flex'}
        fontSize={'2.5rem'}
        p={'1.5rem'}
        alignItems={'center'}
      >
        <AiFillMessage color='blue' />
        <Text marginLeft={'.5rem'}>chatIT</Text>
      </Box>
      <Grid templateRows={'1fr auto'}>
        <Flex align={'center'} justify={'center'}>
          <Menus />
        </Flex>
        <Flex align={'center'} gap='1rem' p='1rem'>
          <Box borderRadius={'50%'} overflow={'hidden'}>
            <Image
              src='/assets/user.jpeg'
              alt='avatar'
              width={40}
              height={40}
            />
          </Box>
          <Box>
            <Text as='p' m='0'>
              John
            </Text>
            <Link href={'/'}>
              <Text color={'#aaa'} fontSize={'.9rem'}>
                Logout
              </Text>
            </Link>
          </Box>
        </Flex>
      </Grid>
    </Grid>
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
