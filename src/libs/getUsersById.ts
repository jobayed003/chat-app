import { clerkClient, currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import { getConversation } from './getConversation';

export const getCurrentUser = async () => {
   const user = (await currentUser()) as User;
   return {
      id: user.id,
      userName: user.username!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      imageUrl: user.imageUrl!,
   };
};

export const getConversationUser = async (id: string) => {
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
};
