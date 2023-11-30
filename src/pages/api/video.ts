import { pusherServer } from '@libs/pusher';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const { id, meetingId, videoCall, audioCall } = JSON.parse(req.body);

      await pusherServer.trigger(id, 'video-call', {
         meetingId,
         videoCall,
         audioCall,
      });

      res.status(200).json({ message: 'Video calling success' });
   } catch (error) {
      console.error('Error updating Video calling:', error);
      res.status(500).json({ message: 'Server error' });
   }
}
