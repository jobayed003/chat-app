import { authToken } from '@api';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import useConversationId from '@hooks/useConversationId';
import { pusherClient } from '@libs/pusher';
import { MeetingProvider, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const MakeCall = () => {
   const [meetingId, setMeetingId] = useState('');
   const [call, setCall] = useState({ videoCall: false, audioCall: false });

   const { user } = useUser();
   const { id } = useConversationId();

   console.log('hello from video');

   useEffect(() => {
      pusherClient.subscribe(id);
      pusherClient.bind(
         'video-call',
         ({ meetingId, videoCall, audioCall }: { meetingId: string; videoCall: boolean; audioCall: boolean }) => {
            setCall({ videoCall, audioCall });
            console.log(meetingId);

            setMeetingId(meetingId);
         }
      );
      return () => {
         pusherClient.unsubscribe(id);
         pusherClient.unbind('video-call', () => {});
      };
   }, []);

   const onMeetingLeave = () => {
      setMeetingId('');
   };
   return (
      authToken &&
      meetingId && (
         <MeetingProvider
            config={{
               meetingId,
               micEnabled: true,
               webcamEnabled: true,
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
   }, [meetingId]);

   return (
      <Flex>
         <Box>
            {meetingId !== '' && (
               <>
                  <Controls />

                  {/* @ts-ignore */}
                  {[...participants.keys()].map((participantId) => (
                     <ParticipantView participantId={participantId} key={participantId} />
                  ))}
               </>
            )}
         </Box>
      </Flex>
   );
};

const Controls = () => {
   const { leave, toggleMic, toggleWebcam } = useMeeting();
   return (
      <Flex gap='1rem' justify={'center'} align='center'>
         <Button onClick={() => leave()}>Leave</Button>
         <Button onClick={() => toggleMic()}>Toggle Mic</Button>
         <Button onClick={() => toggleWebcam()}>Toggle Webcam</Button>
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
      <div key={participantId}>
         <p>
            Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
         </p>
         <audio ref={micRef} autoPlay muted={isLocal} />
         {webcamOn && (
            <ReactPlayer
               playsinline // very very imp prop
               pip={false}
               light={false}
               controls={false}
               muted={true}
               playing={true}
               url={videoStream}
               height={'200px'}
               width={'300px'}
               onError={(err) => {
                  console.log(err, 'participant video error');
               }}
            />
         )}
      </div>
   );
};
