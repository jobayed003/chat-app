import { Db } from 'mongodb';
import { connectDB } from './connectDB';

export const getMessages = async (id: string) => {
   const db = (await connectDB()) as Db;

   const Messages = db.collection('Messages');

   const result = Messages.find({ id });
   return result;
};

export const getMessage = async (id: string) => {
   const result = await getMessages(id);

   let messages = [];
   for await (const message of result) {
      messages.push(message);
   }

   return messages[messages.length - 1];
};
