'use server';

import { connectDB } from '@libs/connectDB';
import { Db } from 'mongodb';

export const getMessages = async (id: string) => {
  const db = (await connectDB()) as Db;

  const Messages = db.collection('Messages');

  const result = Messages.find({ conversationId: id });

  let messages = [];
  for await (const message of result) {
    const temp = {
      docId: message._id.toHexString(),
      conversationId: message.id,
      message: message.message,
      user: message.user,
      sender: message.sender,
      sent: message.sent,
    };
    messages.push(temp);
  }
  return messages;
};
