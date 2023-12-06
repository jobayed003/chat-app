import { pusherServer } from '@libs/pusher';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const { id, callId, userToRing, calledBy, isVideo, url } = JSON.parse(req.body);

      await pusherServer.trigger(id, 'calling', {
         id,
         calledBy,
         isVideo,
         callId,
         userToRing,
         url,
      });
      res.status(200).json({ message: 'Video calling success' });
   } catch (error) {
      console.error('Error occured', error);
      res.status(500).json({ message: 'Server error' });
   }
}
