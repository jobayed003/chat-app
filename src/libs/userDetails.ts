import { auth } from '@clerk/nextjs';
import { Db } from 'mongodb';
import { connectDB } from './connectDB';

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

export const updateUser = async (id: string, newDetails: {}) => {
   const db = (await connectDB()) as Db;

   const User = db.collection('Users');

   const updateDoc = {
      $set: {
         ...newDetails,
      },
   };
   const result = User.updateOne({ id }, updateDoc, { upsert: true });
   return result;
};
