import { getConversations } from '@actions/conversationDetail';
import MessageLayout from '@components/Messages/MessageLayout';

import { fetchUsers } from '@libs/userDetails';

export const dynamic = 'force-dynamic';

const RootLayout = async ({ children }: ChildrenType) => {
  const users = await fetchUsers();

  const conversations = await getConversations();

  return (
    <MessageLayout conversations={conversations} users={users}>
      {children}
    </MessageLayout>
  );
};

export default RootLayout;
