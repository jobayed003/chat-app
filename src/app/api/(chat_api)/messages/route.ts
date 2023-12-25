import { auth } from '@clerk/nextjs';
import { connectDB } from '@libs/connectDB';
import { updateConversation } from '@libs/conversationDetails';
import { pusherServer } from '@libs/pusher';
import { Db } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const { userId } = auth();
      if (!userId) {
         return new Response('Unauthorized', { status: 401 });
      }

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
         lastSender: data.lastSender,
      };

      await updateConversation(data.conversationId, updatedConv);

      revalidatePath(`/dashboard/messages/${data.conversationId}`, 'page');

      return NextResponse.json({ docId: result.insertedId });
   } catch (err) {
      return new Response('Something went wrong', { status: 501 });
   }
}
