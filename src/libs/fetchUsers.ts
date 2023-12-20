import { auth } from '@clerk/nextjs';
import { Db } from 'mongodb';
import { connectDB } from './connectDB';

export const fetchUsers = async () => {
   const { userId } = auth();
   const db = (await connectDB()) as Db;
   const usersCol = db?.collection('Users').find();

   let users = [];
   for await (const doc of usersCol) {
      users.push({
         docId: doc._id.toJSON(),
         username: doc.userName,
         email: doc.email,
         imageUrl: doc.imageUrl,
         firstName: doc.firstName,
         lastName: doc.lastName,
         id: doc.id,
         createdAt: doc.createdAt,
      });
   }

   return users.filter((el: any) => el.id !== userId);
};
