import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import useAuthState from '@hooks/useAuthState';
import { pusherClient } from '@libs/pusher';
import { useEffect, useState } from 'react';

const Ringer = () => {
   const currentUser = useAuthState();

   const [callDetails, setCallDetails] = useState({
      isVideo: false,
      callId: '',
      userToRing: '',
      calledBy: '',
      url: '',
   });

   const { isOpen, onOpen, onClose } = useDisclosure();

   useEffect(() => {
      const { conversationId } = JSON.parse(localStorage.getItem('conversationDetails')!) || { conversationId: '' };

      const callHandler = ({
         isVideo,
         callId,
         userToRing,
         calledBy,
         url,
      }: {
         callId: string;
         isVideo: boolean;
         userToRing: string;
         calledBy: string;
         url: string;
      }) => {
         setCallDetails({ isVideo, callId, userToRing, calledBy, url });
      };

      pusherClient.subscribe(conversationId);
      pusherClient.bind('calling', callHandler);

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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
         <ModalOverlay />
         <ModalContent>
            <ModalBody pb={6}>
               {callDetails.calledBy} is {callDetails.isVideo ? 'video' : 'audio'} calling you
            </ModalBody>

            <ModalFooter>
               <Button
                  colorScheme='green'
                  mr={3}
                  onClick={() => {
                     openNewTab();
                     onClose();
                  }}
               >
                  Answer
               </Button>
               <Button onClick={onClose} bg={'red'}>
                  Decline
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default Ringer;
