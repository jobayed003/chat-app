import { getMessages } from '@libs/getMessages';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
   const URL = req.url.split('/');
   const params = URL[URL.length - 1];

   const result = await getMessages(params);

   let messages = [];
   for await (const message of result) {
      messages.push(message);
   }

   return NextResponse.json({ messages });
}
