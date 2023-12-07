import { clerkClient, currentUser } from '@clerk/nextjs';
import ChatBox from '@components/Messages/ChatBox';
import { getConversation } from '@libs/getConversation';
import { Metadata, ResolvingMetadata } from 'next';

async function getUser(id: string) {
   const { senderId, receiverId } = await getConversation(id);
   const current = await currentUser();
   if (receiverId !== current?.id) {
      const user = await clerkClient.users.getUser(receiverId);
      return user;
   } else if (senderId !== current?.id) {
      const user = await clerkClient.users.getUser(senderId);
      return user;
   }

   return { username: '', emailAddresses: [], imageUrl: '' };
}

type Props = {
   params: { conversationId: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const { username } = await getUser(params?.conversationId);

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
      conversationId: string;
      slug: string;
   };
}) => {
   const { conversationId } = params;
   const { imageUrl, username, emailAddresses } = await getUser(conversationId);
   return (
      <ChatBox name={username || ''} email={emailAddresses[0].emailAddress} imageUrl={imageUrl} id={conversationId} />
   );
};

export default ChatBoxPage;
