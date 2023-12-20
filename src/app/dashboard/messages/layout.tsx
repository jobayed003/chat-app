import { auth } from '@clerk/nextjs';
import MessageLayout from '@components/Messages/MessageLayout';
import { getConversationRef, getConversationUser } from '@libs/conversationDetails';
import { fetchUsers } from '@libs/fetchUsers';

const RootLayout = async ({ children }: ChildrenType) => {
   const users = await fetchUsers();
   const { userId } = auth();

   const doc = await getConversationRef();

   const conversationCol = doc.find({ users: { $eq: userId } });

   let conversations: any = [];

   for await (const doc of conversationCol) {
      const tempData = {
         conversationId: doc._id.toHexString(),
         users: doc.users,
         chats: doc.chats,
      };
      const conversationUser = await getConversationUser(tempData.conversationId);

      conversations.push({ ...tempData, conversationUser });
   }

   return (
      <MessageLayout conversations={conversations} users={users}>
         {children}
      </MessageLayout>
   );
};

export default RootLayout;
