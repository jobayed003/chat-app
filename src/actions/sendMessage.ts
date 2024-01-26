'use server';

import { auth } from '@clerk/nextjs';
import { connectDB } from '@libs/connectDB';

import { pusherServer } from '@libs/pusher';
import { Db } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { updateConversation } from './conversationDetail';

export const sendMessage = async (data: any) => {
  const { userId } = auth();
  if (!userId) {
    return new Error('Unauthorized');
  }

  await pusherServer.trigger(data.conversationId, 'newMessage', data);

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

  const updatedConv = {
    text: data.message,
    sent: data.sent,
    seen: data.seen,
    senderId: data.sender,
    lastSender: data.lastSender,
  };

  await updateConversation(data.conversationId, updatedConv);

  revalidatePath(`/dashboard/messages/${data.conversationId}`);
  revalidatePath('/dashboard/messages');

  return result.insertedId;
};
