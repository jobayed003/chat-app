import { auth } from '@clerk/nextjs';
import { disconnectDB } from '@libs/connectDB';
import { getConversationRef } from '@libs/conversationDetails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const { userId } = auth();
   if (!userId) {
      return new Response('Unauthorized', { status: 401 });
   }

   const data = await req.json();

   const doc = await getConversationRef();

   const existedDoc = await doc.findOne({ users: { $all: data.users } });

   if (existedDoc) {
      return NextResponse.json({ conversationId: existedDoc._id });
   } else {
      const result = await doc.insertOne(data);

      await disconnectDB();
      return NextResponse.json({ conversationId: result.insertedId });
   }
}
