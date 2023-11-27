import { pusherServer } from '@libs/pusher';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const { id, status, typingUser } = JSON.parse(req.body);
      await pusherServer.trigger(id, 'user-typing', {
         status,
         typingUser,
      });

      res.status(200).json({ message: 'Typing status updated successfully' });
   } catch (error) {
      console.error('Error updating typing status:', error);
      res.status(500).json({ message: 'Server error' });
   }
}
