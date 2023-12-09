import { Db } from 'mongodb';
import { connectDB } from './connectDB';

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
