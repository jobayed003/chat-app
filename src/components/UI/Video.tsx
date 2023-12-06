import { authToken } from '@api';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import useConversationId from '@hooks/useConversationId';
import { MeetingProvider, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FaMicrophone, FaVideo } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const MakeCall = () => {
   const [meetingId, setMeetingId] = useState('');
   const { user } = useUser();
   const { id } = useConversationId();

   const searchParams = useSearchParams();

   // let params = [];
   // for (const [key, value] of searchParams) {
   //    params.push(value);

   //    console.log(params[0]);

   //    // console.log(key, '->', value);
   // }
   const calledBy = searchParams?.get('called_by');
   const userToRing = searchParams?.get('user_to_ring');

   const isVideo = searchParams?.get('has_video') === 'true';

   useEffect(() => {
      const callId = searchParams?.get('call_id') as string;

      user && setMeetingId(callId);

      return () => {
         setMeetingId('');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   const onMeetingLeave = () => {
      setMeetingId('');
      close();
   };
   return (
      authToken &&
      meetingId && (
         <MeetingProvider
            config={{
               meetingId,
               micEnabled: true,
               webcamEnabled: isVideo,
               name: user?.username!,
            }}
            token={authToken}
         >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
         </MeetingProvider>
      )
   );
};
export default memo(MakeCall);

const MeetingView = ({ onMeetingLeave, meetingId }: { onMeetingLeave: () => void; meetingId: string }) => {
   const { join, participants } = useMeeting({
      onMeetingJoined: () => {},

      onMeetingLeft: () => {
         onMeetingLeave();
      },
   });

   useEffect(() => {
      join();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [meetingId]);

   return (
      <Flex flexDir={'column'} align='space-between'>
         {meetingId !== '' && (
            <Flex gap={'2rem'} justify={'space-between'} px='1rem'>
               {/* @ts-ignore */}
               {[...participants.keys()].map((participantId) => (
                  <ParticipantView participantId={participantId} key={participantId} />
               ))}
            </Flex>
         )}
         <Controls />
      </Flex>
   );
};

const Controls = () => {
   const { leave, toggleMic, toggleWebcam } = useMeeting();

   return (
      <Flex gap='1rem' justify={'center'} align='center'>
         <Button onClick={() => leave()} bg='red'>
            End Call
         </Button>
         <Button onClick={() => toggleMic()}>
            <FaMicrophone />
         </Button>
         <Button onClick={() => toggleWebcam()}>
            <FaVideo />
         </Button>
      </Flex>
   );
};

const ParticipantView = ({ participantId }: { participantId: string }) => {
   const micRef = useRef<HTMLAudioElement>(null);
   const webcamRef = useRef<HTMLVideoElement>(null);
   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

   const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
         const mediaStream = new MediaStream();
         mediaStream.addTrack(webcamStream.track);
         return mediaStream;
      }
   }, [webcamStream, webcamOn]);

   useEffect(() => {
      if (micRef.current) {
         if (micOn && micStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);

            micRef.current.srcObject = mediaStream;
            micRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error));
         } else {
            micRef.current.srcObject = null;
         }
      }
   }, [micStream, micOn]);

   return (
      <Flex flexDir={'column'} key={participantId} py='.5rem'>
         <audio ref={micRef} autoPlay muted={isLocal} />
         {webcamOn ? (
            <ReactPlayer
               playsinline // very very imp prop
               pip={false}
               light={false}
               controls={false}
               muted={true}
               playing={true}
               url={videoStream}
               height={'400px'}
               width={'450px'}
               onError={(err) => {
                  console.log(err, 'participant video error');
               }}
            />
         ) : (
            <Flex height={'400px'} width={'450px'} borderRadius={'5px'} overflow={'hidden'} align='center'>
               <Box bg={'#000'} w='100%' h='86%' textAlign={'center'}></Box>
            </Flex>
         )}
         <Box textAlign='center'>
            <Text as='h1' fontSize='1.4rem'>
               {displayName}
            </Text>
            <Text>
               Camera : {webcamOn ? 'ON' : 'OFF'} | Speaker: {micOn ? 'ON' : 'OFF'}
            </Text>
         </Box>
      </Flex>
   );
};
