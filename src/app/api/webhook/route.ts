import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function handler(req: Request) {
   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY;

   if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
   }

   // Get the headers
   const headerPayload = headers();

   // Get the body
   const payload = await req.json();

   const body = JSON.stringify(payload);

   console.log(payload);

   const svix_id = headerPayload.get('svix-id');
   const svix_timestamp = headerPayload.get('svix-timestamp');
   const svix_signature = headerPayload.get('svix-signature');

   // If there are no headers, error out
   if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
         status: 400,
      });
   }

   // Create a new Svix instance with your secret.
   const wh = new Webhook(WEBHOOK_SECRET);

   let evt: WebhookEvent;

   // Verify the payload with the headers
   try {
      evt = wh.verify(body, {
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
   type EventType = 'user.created' | 'user.updated' | '*';

   // Get the ID and type
   const { id } = evt.data;

   // @ts-ignore
   const eventType: EventType = evt.type;

   if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, ...attributes } = evt.data;
      console.log(attributes);
   }

   console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
   console.log('Webhook body:', body);

   return new Response('', { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
