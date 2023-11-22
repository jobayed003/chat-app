import Dashboard from '@components/Layout/Dashboard';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

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
      description: 'Personal chatting app created by github user jobayed003',
      keywords: 'chat app, video calling app, javascript',
   };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return <Dashboard>{children}</Dashboard>;
};

export default RootLayout;
