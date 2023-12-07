import { createMeeting } from '@api';

const openNewTab = async (videoCall: boolean) => {
   const screenWidth = window.screen.width;
   const screenHeight = window.screen.height;

   const newWidth = screenWidth * 0.5;
   const newHeight = screenHeight * 0.5;
   const left = (screenWidth - newWidth) / 2;
   const top = (screenHeight - newHeight) / 2;

   const windowFeatures = `width=${newWidth},height=${newHeight},left=${left},top=${top}`;

   // const callId = await createMeeting({ token: authToken });
   // const url = `/groupcall?conversation_id=${id}&call_id=${callId}&has_video=${videoCall}&user_to_ring=${name}&called_by=${user?.username}`;

   // await fetch('/api/video', {
   //    method: 'POST',
   //    body: JSON.stringify({
   //       id,
   //       callId,
   //       calledBy: user?.username,
   //       isVideo: videoCall,
   //       userToRing: name,
   //       url,
   //    }),
   // });

   // if (callId) {
   // open(window.origin + url, 'NewWindow', windowFeatures);
   // }
};
