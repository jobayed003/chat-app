import { cookies } from 'next/headers';
import './globals.css';
import Providers from './providers';

export const metadata = {
   title: 'Chat App',
   description: 'Personal chatting app created by github user jobayed003',
   keywords: 'chat app, video calling app, javascript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const cookieStore = cookies();
   const defaultTheme = 'dark';
   const uiColorMode =
      (cookieStore.get('chakra-ui-color-mode')?.value as 'light' | 'dark') || defaultTheme;

   return (
      <html lang='en'>
         <head>
            <link rel='shortcut icon' href='/static/favicon.ico' />
         </head>
         <body>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
