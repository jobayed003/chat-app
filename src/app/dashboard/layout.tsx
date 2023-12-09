import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import Dashboard from '@components/Dashboard/Dashboard';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';

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

const RootLayout = async ({ children }: ChildrenType) => {
   const user = (await currentUser()) as User;
   // @ts-ignore
   return (
      <Dashboard
         user={{
            id: user.id,
            userName: user.username!,
            firstName: user.firstName!,
            lastName: user.lastName!,
            imageUrl: user.imageUrl!,
         }}
      >
         {children}
      </Dashboard>
   );
};

export default RootLayout;
