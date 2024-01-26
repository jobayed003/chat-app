'use server';

import { auth } from '@clerk/nextjs';

import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { getConversationRef } from './conversationDetail';

export const seenMessage = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const doc = await getConversationRef();

  await doc.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        'chats.seen': true,
      },
    }
  );

  revalidatePath(`/dashboard/messages/${id}`);
};
