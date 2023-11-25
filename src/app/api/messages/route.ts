import { connectDB } from '@libs/connectDB';
import { pusherServer } from '@libs/pusher';
import { Db } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const data = await req.json();

   const db = (await connectDB()) as Db;

   const Messages = db.collection('Messages');

   const newMessage = {
      id: data.id,
      message: data.message,
      user: data.user,
      sender: data.sender,
      sent: data.sent,
   };

   const result = await Messages.insertOne(newMessage);

   await pusherServer.trigger(data.id, 'newMessage', data);

   return NextResponse.json({ docId: result.insertedId });
}
