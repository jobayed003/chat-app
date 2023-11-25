import { Db, ObjectId } from 'mongodb';
import { connectDB } from './connectDB';

export const getConversation = async (id: string) => {
   const db = (await connectDB()) as Db;

   const Conversations = db.collection('Conversations');

   const query = new ObjectId(id);

   // @ts-ignore
   const { senderId, receiverId } = await Conversations.findOne(query);
   return { senderId, receiverId };
};
