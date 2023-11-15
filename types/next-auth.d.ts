import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface Session {
      session: {
         user: {
            /** The user's postal address. */
            email: string;
            id: string;
         } & DefaultSession['user'];
      };
   }
   interface Profile {
      account: { provider: string };
      profile: { email: string; picture: string; name: string; email_verified: boolean };
   }
}
