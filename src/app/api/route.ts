import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
   const { userId } = auth();
   const user = await currentUser();
   console.log(user);

   if (!userId) {
      return new Response('Unauthorized', { status: 401 });
   }

   const data = { message: 'Hello World' };

   return NextResponse.json({ data });
}
