'use client';
import {
  Avatar,
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { createConversation } from '@actions/conversationDetail';
import { useAuthState } from '@context/AuthProvider';
import { useAppState } from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import useSearchDebounce from '@hooks/useSearchDebounce';
import { compareDates } from '@libs/compareDates';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState, useTransition } from 'react';
import { MdSearch } from 'react-icons/md';
import DynamicText from '../Util/DynamicText';

export const SearchBar = ({ users }: { users: CurrentUser[] }) => {
  const [searchedUsers, setSearchedUsers] = useState<CurrentUser[]>(users);
  const { currentUser } = useAuthState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchedUserName, setSearchedUserName] = useSearchDebounce<any>();

  const filterUsers = () => {
    const replaceAll = /\b(?:-| |,)\b/gi;
    // @ts-ignore
    const text = searchedUserName.toLowerCase().replace(replaceAll, '').trim();
    const regex = new RegExp(text, 'i');
    return users.filter((user) => regex.test(user.username.replace(replaceAll, '').trim()));
  };

  useEffect(() => {
    setSearchedUsers(filterUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedUserName]);

  return (
    <>
      <Box fontSize={'1.5rem'}>
        <MdSearch cursor={'pointer'} onClick={onOpen} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex flexDir={'column'} gap='1rem' py={'1rem'}>
              <Input
                placeholder='Type a user name'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchedUserName(e.target.value)}
              />
              <DynamicText px='.5rem'>Select a user to start a conversation</DynamicText>
              <Box onClick={onClose}>
                {searchedUsers.map((signedUser) => (
                  <UserDetails
                    key={signedUser.id}
                    name={signedUser.username}
                    joinedAt={+signedUser.createdAt!}
                    imgUrl={signedUser.imageUrl}
                    userId={signedUser.id}
                    currentUser={currentUser}
                  />
                ))}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

interface SearchedUser {
  name: string;
  imgUrl: string;
  joinedAt: number;
  userId: string;
  currentUser: CurrentUser;
}

const UserDetails = ({ name, imgUrl, joinedAt, userId, currentUser }: SearchedUser) => {
  const router = useRouter();
  const { id } = useConversationId();
  const { setIsLoading } = useAppState();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const bgColor = useColorModeValue('#ddd', 'blue.800');

  const handleClick = useCallback(async () => {
    const data = {
      users: [userId, currentUser.id],
      chats: {
        seen: false,
        senderId: '',
        sent: '',
        texts: [],
      },
    };
    startTransition(() => {
      setIsLoading(true);

      createConversation(data)
        .then((conversationId) => {
          setIsLoading(false);
          router.push(`/dashboard/messages/${conversationId}`);
        })
        .catch(() =>
          toast({
            title: 'Something went wrong!',
            description: 'Please try again',
            isClosable: true,
            position: 'top-right',
          })
        );
    });
  }, [id]);

  return (
    <Box
      cursor={'pointer'}
      _active={{ bg: bgColor }}
      _hover={{ bg: bgColor }}
      px={'.5rem'}
      onClick={(e) => {
        !isPending && handleClick();
      }}
    >
      <Flex align={'center'}>
        <Flex py='1rem' align={'center'} gap={'.8rem'} justify={'center'}>
          <Avatar name={name} src={imgUrl} size={'md'} />

          {/* <Box borderRadius={'50%'} overflow={'hidden'}>
                  <Image width={50} height={50} alt='user img' src={imgUrl} />
               </Box> */}

          <Box>
            <DynamicText fontSize='1rem'>{name}</DynamicText>
            <DynamicText color={'gray'} fontSize='12px'>
              {'Joined ' + compareDates(joinedAt).difference.humanize() + ' ago'}
            </DynamicText>
          </Box>
        </Flex>
        <Flex direction={'column'}></Flex>
      </Flex>
    </Box>
  );
};
