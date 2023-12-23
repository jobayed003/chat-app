import { auth, clerkClient } from '@clerk/nextjs';
import { Db, ObjectId } from 'mongodb';
import { connectDB } from './connectDB';

export const getConversationRef = async () => {
   const db = (await connectDB()) as Db;
   const conversationDoc = db.collection('Conversations');

   return conversationDoc;
};

export const getConversationById = async (id: string) => {
   const doc = await getConversationRef();
   const query = new ObjectId(id);

   // @ts-ignore
   const conversationDetails = await doc.findOne(query);

   return conversationDetails;
};

export const getConversationUser = async (id: string) => {
   const conversationDetails = await getConversationById(id);
   const { userId } = auth();

   const conversationUser = conversationDetails?.users.filter((user: string) => user !== userId)[0];

   const user = await clerkClient.users.getUser(conversationUser);
   return {
      id: user.id,
      username: user.username,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
   };
};

type lastChat = {
   text: string[];
   sent: string;
   senderId: string;
   seen: boolean;
};

export const updateConversation = async (id: string, lastChat: lastChat, isCurrentUser: boolean) => {
   const doc = await getConversationRef();

   if (isCurrentUser) {
      const updateMessage = { $push: { 'chats.text': lastChat.text } };
      await doc.updateOne({ _id: new ObjectId(id) }, updateMessage);
   } else {
      const update = {
         $set: {
            'chats.sent': lastChat.sent,
            'chats.senderId': lastChat.senderId,
            'chats.seen': lastChat.seen,
            'chats.text': [lastChat.text],
         },
      };
      // @ts-ignore
      await doc.updateOne({ _id: new ObjectId(id) }, update, { upsert: true });
   }
};
