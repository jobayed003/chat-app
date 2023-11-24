import { pusherServer } from '@libs/pusher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
   const data = await req.json()!;

   await pusherServer.trigger('test', 'newMessage', data);

   return NextResponse.json(data);
}
