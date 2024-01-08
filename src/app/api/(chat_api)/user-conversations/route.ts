import { auth } from '@clerk/nextjs';
import { getConversationRef, getConversationUser } from '@libs/conversationDetails';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
   const { userId } = auth();
   if (!userId) {
      return new Response('Unauthorized', { status: 401 });
   }

   const doc = await getConversationRef();

   const conversationCol = doc.find({ users: { $eq: userId } });

   let conversations: ConversationDetails[] = [];

   for await (const doc of conversationCol) {
      const tempData = {
         conversationId: doc._id.toHexString(),
         users: doc.users,
         chats: doc.chats,
      };
      const conversationUser = await getConversationUser(tempData.conversationId);
      // @ts-ignore
      conversations.push({ ...tempData, conversationUser });
   }

   return NextResponse.json(conversations);
}
