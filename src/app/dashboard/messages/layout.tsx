import MessageLayout from '@components/Messages/MessageLayout';
import { fetchUsers } from '@libs/fetchUsers';

const RootLayout = async ({ children }: ChildrenType) => {
   const users = await fetchUsers();

   return <MessageLayout users={users}>{children}</MessageLayout>;
};

export default RootLayout;
