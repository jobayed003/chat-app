import { clerkClient } from '@clerk/nextjs';
import ChatBox from '@components/UI/ChatBox';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { userId: string };
};

async function getUser(userId: string) {
   const user = await clerkClient.users.getUser(userId);

   return user;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const { username } = await getUser(params?.userId);

   return {
      title: username + ' | chatIT',
      description: 'Personal chatting app created by github user jobayed003',
      keywords: 'chat app, video calling app, javascript',
   };
}

const ChatBoxPage = async ({
   params,
}: {
   params: {
      userId: string;
      slug: string;
   };
}) => {
   const { imageUrl, username } = await getUser(params?.userId);
   return <ChatBox name={username || ''} imageUrl={imageUrl} />;
};

export default ChatBoxPage;
