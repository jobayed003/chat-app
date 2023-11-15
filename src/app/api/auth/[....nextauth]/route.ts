import NextAuth from 'next-auth';
import { Profile, Session } from 'next-auth/core/types';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_ID!,
         clientSecret: process.env.GITHUB_SECRET!,
      }),
   ],
   callbacks: {
      async session({ session }: Session) {
         return session;
      },

      async signIn({ account, profile }: Profile) {
         if (account.provider === 'google') {
            return profile.email_verified && profile.email.endsWith('@google.com');
         }
         return true;
      },
   },
});

export { handler as GET, handler as POST };
