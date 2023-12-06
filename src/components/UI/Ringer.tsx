import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import useAuthState from '@hooks/useAuthState';
import { pusherClient } from '@libs/pusher';
import { useEffect, useState } from 'react';

const Ringer = () => {
   const currentUser = useAuthState();

   const [callDetails, setCallDetails] = useState({ isVideo: false, callId: '', userToRing: '', url: '' });

   const { isOpen, onOpen, onClose } = useDisclosure();

   useEffect(() => {
      const { conversationId } = JSON.parse(localStorage.getItem('conversationDetails')!) || { conversationId: '' };

      pusherClient.subscribe(conversationId);
      pusherClient.bind(
         'calling',
         ({
            isVideo,
            callId,
            userToRing,
            url,
         }: {
            callId: string;
            isVideo: boolean;
            userToRing: string;
            url: string;
         }) => {
            setCallDetails({ isVideo, callId, userToRing, url });
         }
      );

      return () => {
         pusherClient.unsubscribe(conversationId);
         pusherClient.unbind('calling', () => {});
      };
   }, []);

   useEffect(() => {
      callDetails.userToRing === currentUser?.username && onOpen();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentUser, callDetails]);

   const openNewTab = async () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const newWidth = screenWidth * 0.5;
      const newHeight = screenHeight * 0.5;
      const left = (screenWidth - newWidth) / 2;
      const top = (screenHeight - newHeight) / 2;

      const windowFeatures = `width=${newWidth},height=${newHeight},left=${left},top=${top}`;

      open(window.origin + callDetails.url, 'NewWindow', windowFeatures);
   };

   return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalCloseButton />
            <ModalBody pb={6}></ModalBody>

            <ModalFooter>
               <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                     openNewTab();
                     onClose();
                  }}
               >
                  Save
               </Button>
               <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default Ringer;
