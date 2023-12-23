import { connectDB } from '@libs/connectDB';
import { updateConversation } from '@libs/conversationDetails';
import { pusherServer } from '@libs/pusher';
import { Db } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const data = await req.json();

      const db = (await connectDB()) as Db;

      const Messages = db.collection('Messages');

      const newMessage = {
         conversationId: data.conversationId,
         message: data.message,
         user: data.user,
         sender: data.sender,
         sent: data.sent,
      };

      const result = await Messages.insertOne(newMessage);

      await pusherServer.trigger(data.conversationId, 'newMessage', data);

      const updatedConv = {
         text: data.message,
         sent: data.sent,
         seen: data.seen,
         senderId: data.sender,
      };

      await updateConversation(data.conversationId, updatedConv, data.isCurrentUser);

      return NextResponse.json({ docId: result.insertedId });
   } catch (err) {
      return new Response('Something went wrong', { status: 501 });
   }
}
