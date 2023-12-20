import ChatBox from '@components/Messages/ChatBox';

import { getConversationUser } from '@libs/conversationDetails';
import { getMessages } from '@libs/getMessages';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { conversationId: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const { username } = await getConversationUser(params?.conversationId);

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
   const messages = await getMessages(conversationId);

   const { imageUrl, id, username, email } = await getConversationUser(conversationId);
   return (
      <ChatBox
         name={username || ''}
         email={email}
         imageUrl={imageUrl}
         userId={id}
         conversationId={conversationId}
         messagesList={messages}
      />
   );
};

export default ChatBoxPage;
