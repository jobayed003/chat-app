'use client';
import { Box, Flex, Input, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';

import useSearchDebounce from '@hooks/useSearchDebounce';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import DynamicText from '../Util/DynamicText';

type SearchBarProps = {
   users: CurrentUser[];
};

export const SearchBar = ({ users }: SearchBarProps) => {
   const [searchedUsers, setSearchedUsers] = useState<CurrentUser[]>(users);

   const { isOpen, onOpen, onClose } = useDisclosure();
   const { user } = useUser();
   const [searchedUserName, setSearchedUserName] = useSearchDebounce();

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
               {/* <ModalCloseButton /> */}
               <ModalBody>
                  <Flex flexDir={'column'} gap='1rem' py={'1rem'}>
                     <Input
                        placeholder='Type a user name'
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           // @ts-expect-error
                           setSearchedUserName(e.target.value)
                        }
                     />
                     <DynamicText px='.5rem'>Select a user to start a conversation</DynamicText>
                     <Box onClick={onClose}>
                        {/* {searchedUsers.map((signedUser) => (
                           <ChatUser
                              key={Math.random()}
                              name={signedUser.username}
                              email={signedUser.email!}
                              status={'Offline'}
                              img={signedUser.imageUrl}
                              messageDetails={{
                                 lastMessage:
                                    'Joined ' + compareDates(+signedUser.createdAt!).difference.humanize() + ' ago',
                              }}
                              userId={signedUser.id}
                              currentUser={user}
                           />
                        ))} */}
                     </Box>
                  </Flex>
               </ModalBody>
               {/* 
               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Close
                  </Button>
               </ModalFooter> */}
            </ModalContent>
         </Modal>
      </>
   );
};
