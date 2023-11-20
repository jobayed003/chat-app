import { ClerkProvider } from '@clerk/nextjs';
import { AuthContextProvider } from '@context/AuthProvider';
import Providers from '../config/providers';
import './globals.css';

export const metadata = {
   title: 'ChatIT | Dashboard',
   description: 'Personal chatting app created by github user jobayed003',
   keywords: 'chat app, video calling app, javascript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider>
         <AuthContextProvider>
            <html lang='en'>
               <head>
                  <link rel='shortcut icon' href='/static/favicon.ico' />
               </head>
               <body>
                  <Providers>{children}</Providers>
               </body>
            </html>
         </AuthContextProvider>
      </ClerkProvider>
   );
}
