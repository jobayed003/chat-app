import { authToken, createMeeting } from '@api';
import { useUser } from '@clerk/nextjs';
import { MeetingProvider, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
   const [meetingId, setMeetingId] = useState('');
   const { user } = useUser();

   //Getting the meeting id by calling the api we just wrote
   const getMeetingAndToken = async (id?: string) => {
      const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
      setMeetingId(meetingId);
   };

   //This will set Meeting Id to null when meeting is left or ended
   const onMeetingLeave = () => {
      // @ts-expect-error
      setMeetingId(null);
   };
   return authToken && meetingId ? (
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
   ) : (
      <JoinScreen getMeetingAndToken={getMeetingAndToken} />
   );
};
export default Video;

function JoinScreen({ getMeetingAndToken }: { getMeetingAndToken: (meeting?: string) => void }) {
   const [meetingId, setMeetingId] = useState<string | undefined>();
   const onClick = async () => {
      getMeetingAndToken(meetingId);
   };
   return (
      <div>
         <input
            type='text'
            placeholder='Enter Meeting Id'
            onChange={(e) => {
               setMeetingId(e.target.value);
            }}
         />
         <button onClick={onClick}>Join</button>
         {' or '}
         <button onClick={onClick}>Create Meeting</button>
      </div>
   );
}

function MeetingView({ onMeetingLeave, meetingId }: { onMeetingLeave: () => void; meetingId: string }) {
   const [joined, setJoined] = useState('');
   //Get the method which will be used to join the meeting.
   //We will also get the participants list to display all participants
   const { join, participants } = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
         setJoined('JOINED');
      },
      //callback for when meeting is left
      onMeetingLeft: () => {
         onMeetingLeave();
      },
   });
   const joinMeeting = () => {
      setJoined('JOINING');
      join();
   };

   return (
      <div className='container'>
         <h3>Meeting Id: {meetingId}</h3>
         {joined && joined == 'JOINED' ? (
            <div>
               <Controls />
               {/* //For rendering all the participants in the meeting */}
               {/* @ts-ignore */}
               {[...participants.keys()].map((participantId) => (
                  <ParticipantView participantId={participantId} key={participantId} />
               ))}
            </div>
         ) : joined && joined == 'JOINING' ? (
            <p>Joining the meeting...</p>
         ) : (
            <button onClick={joinMeeting}>Join</button>
         )}
      </div>
   );
}

function Controls() {
   const { leave, toggleMic, toggleWebcam } = useMeeting();
   return (
      <div>
         <button onClick={() => leave()}>Leave</button>
         <button onClick={() => toggleMic()}>toggleMic</button>
         <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
   );
}

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
   console.log(videoStream);

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
