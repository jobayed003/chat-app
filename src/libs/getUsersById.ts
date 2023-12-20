import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';

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
