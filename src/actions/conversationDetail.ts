'use server';

import { auth, clerkClient } from '@clerk/nextjs';
import { connectDB, disconnectDB } from '@libs/connectDB';
import { Db, ObjectId } from 'mongodb';

export const getConversationRef = async () => {
  const db = (await connectDB()) as Db;
  const conversationDoc = db.collection('Conversations');

  return conversationDoc;
};

export const createConversation = async (data: any): Promise<string | Error> => {
  const { userId } = auth();
  if (!userId) {
    return new Error('Unauthorized');
  }

  const doc = await getConversationRef();

  let id = '';

  const existedDoc = await doc.findOne({ users: { $all: data.users } });

  if (existedDoc) {
    id = existedDoc._id.toString();

    return id;
  } else {
    const result = await doc.insertOne(data);

    await disconnectDB();

    id = result.insertedId.toString();

    return id;
  }
};

export const getConversationById = async (id: string) => {
  const doc = await getConversationRef();
  const query = new ObjectId(id);

  // @ts-ignore
  const conversationDetails = await doc.findOne(query);

  return conversationDetails;
};

export const getConversations = async () => {
  const { userId } = auth();

  const doc = await getConversationRef();

  const conversationCol = doc.find({ users: { $eq: userId } }).sort({ 'chats.sent': -1 });

  let conversations: ConversationDetails[] = [];

  for await (const doc of conversationCol) {
    const tempData = {
      conversationId: doc._id.toHexString(),
      users: doc.users,
      chats: doc.chats,
    };
    const conversationUser = await getConversationUser(tempData.conversationId);
    // @ts-ignore
    conversations.push({ ...tempData, conversationUser });
  }

  return conversations;
};

export const getConversationUser = async (id: string) => {
  const conversationDetails = await getConversationById(id);
  const { userId } = auth();

  const conversationUser = conversationDetails?.users.filter((user: string) => user !== userId)[0];

  if (!conversationUser) {
    return null;
  }

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
  lastSender: string;
};

export const updateConversation = async (id: string, lastChat: lastChat) => {
  const doc = await getConversationRef();
  const { userId } = auth();

  const isCurrentUser = lastChat.lastSender === userId;

  if (isCurrentUser) {
    const updateMessage = {
      $set: {
        'chats.sent': lastChat.sent,
        'chats.senderId': lastChat.senderId,
      },
      $push: { 'chats.texts': lastChat.text },
    };
    await doc.updateOne({ _id: new ObjectId(id) }, updateMessage);
  } else {
    const update = {
      $set: {
        'chats.sent': lastChat.sent,
        'chats.senderId': lastChat.senderId,
        'chats.seen': lastChat.seen,
        'chats.texts': [lastChat.text],
      },
    };
    // @ts-ignore
    await doc.updateOne({ _id: new ObjectId(id) }, update, { upsert: true });
  }
};
