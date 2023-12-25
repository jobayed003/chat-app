import { auth } from '@clerk/nextjs';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import { connectDB } from '@libs/connectDB';
import { updateUser } from '@libs/userDetails';

import { Db } from 'mongodb';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function handler(req: Request) {
   const { userId } = auth();
   if (!userId) {
      return new Response('Unauthorized', { status: 401 });
   }

   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY || '';

   const headerPayload = headers();
   const payload = await req.json();

   const svix_id = headerPayload.get('svix-id');
   const svix_timestamp = headerPayload.get('svix-timestamp');
   const svix_signature = headerPayload.get('svix-signature');

   // If there are no headers, error out
   if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
         status: 400,
      });
   }

   const wh = new Webhook(WEBHOOK_SECRET);

   let evt: WebhookEvent;

   try {
      evt = wh.verify(JSON.stringify(payload), {
         'svix-id': svix_id,
         'svix-timestamp': svix_timestamp,
         'svix-signature': svix_signature,
      }) as WebhookEvent;
   } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occured', {
         status: 400,
      });
   }
   type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*';

   // @ts-ignore
   const eventType: EventType = evt.type;
   const user = evt.data as UserJSON;

   if (eventType === 'user.created') {
      try {
         const userDetails = {
            id: user.id,
            userName: user.username,
            email: user.email_addresses[0].email_address,
            imageUrl: user.image_url,
            firstName: user.first_name,
            lastName: user.last_name,
            createdAt: user.created_at,
         };

         const db = (await connectDB()) as Db;

         const Users = db.collection('Users');
         await Users.insertOne(userDetails);
         return new Response('User created successfully', { status: 200 });
      } catch (error) {
         return new Response('Something went wrong!', { status: 501 });
      }
   }
   if (eventType === 'user.deleted') {
      const { id } = evt.data;

      const db = (await connectDB()) as Db;

      const Users = db.collection('Users');
      await Users.deleteOne({ id });
      return new Response('User deleted successfully', { status: 200 });
   }
   if (eventType === 'user.updated') {
      const userDetails = {
         id: user.id,
         userName: user.username,
         email: user.email_addresses[0].email_address,
         imageUrl: user.image_url,
         firstName: user.first_name,
         lastName: user.last_name,
         createdAt: user.created_at,
      };
      await updateUser(user.id, userDetails);
      return new Response('User updated successfully', { status: 200 });
   }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
