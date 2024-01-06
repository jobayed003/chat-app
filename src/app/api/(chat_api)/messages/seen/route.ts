import { auth } from '@clerk/nextjs';
import { getConversationRef } from '@libs/conversationDetails';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const { userId } = auth();
      if (!userId) {
         return new Response('Unauthorized', { status: 401 });
      }

      const { id } = await req.json();

      const doc = await getConversationRef();

      await doc.updateOne(
         { _id: new ObjectId(id) },
         {
            $set: {
               'chats.seen': true,
            },
         }
      );

      return new Response('Success', { status: 200 });
   } catch (err) {
      return new Response('Something went wrong', { status: 501 });
   }
}
