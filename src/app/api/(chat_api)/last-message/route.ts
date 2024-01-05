import { auth } from '@clerk/nextjs';
import { getConversationById } from '@libs/conversationDetails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const { userId } = auth();
   if (!userId) {
      return new Response('Unauthorized', { status: 401 });
   }
   const { conversationId } = await req.json();

   const lastChat = await getConversationById(conversationId);
   return NextResponse.json(lastChat);
}
