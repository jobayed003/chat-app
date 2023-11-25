import { connectDB } from '@libs/connectDB';
import { Db } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const data = await req.json();
   const db = (await connectDB()) as Db;

   const Conversations = db.collection('Conversations');

   const existedDoc = await Conversations.findOne({ users: { $all: data.users } });

   if (existedDoc) {
      return NextResponse.json({ conversationId: existedDoc._id });
   } else {
      const result = await Conversations.insertOne(data);

      return NextResponse.json({ conversationId: result.insertedId });
   }
}
