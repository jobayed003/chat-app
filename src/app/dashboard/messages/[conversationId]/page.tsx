import ChatBox from '@components/Messages/ChatBox';

import { getMessages } from '@libs/getMessages';
import { getConversationUser } from '@libs/getUsersById';
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

   const { imageUrl, username, emailAddresses } = await getConversationUser(conversationId);
   return (
      <ChatBox
         name={username || ''}
         email={emailAddresses[0].emailAddress}
         imageUrl={imageUrl}
         id={conversationId}
         messagesList={messages}
      />
   );
};

export default ChatBoxPage;
