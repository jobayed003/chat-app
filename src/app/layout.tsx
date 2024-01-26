import { ClerkProvider } from '@clerk/nextjs';
import { AuthContextProvider } from '@context/AuthProvider';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import Providers from '../config/providers';
import './globals.css';

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || 'chatIT';
  const pathSegments = pathname.split('/').filter((segment) => segment !== ''); // Split pathname into segments and remove empty segments
  const title = pathSegments.join(' | ');

  return {
    title,
    description: 'Personal chatting app',
    keywords: 'chat app, video calling app, javascript',
  };
}

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
