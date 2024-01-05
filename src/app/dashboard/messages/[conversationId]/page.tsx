import ChatBox from '@components/Messages/ChatBox';

import { getConversationUser } from '@libs/conversationDetails';
import { getMessages } from '@libs/getMessages';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
   params: { conversationId: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const userData = await getConversationUser(params?.conversationId);

   return {
      title: userData ? userData.username + ' | chatIT' : 'Messages | chatIT',
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
   const messages = await getMessages(conversationId);

   const userData = await getConversationUser(conversationId);

   if (!userData) {
      redirect('/dashboard/messages');
   }
   return (
      <ChatBox
         name={userData.username || ''}
         email={userData.email}
         imageUrl={userData.imageUrl}
         userId={userData.id}
         conversationId={conversationId}
         messagesList={messages}
      />
   );
};

export default ChatBoxPage;
