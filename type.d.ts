interface CurrentUser {
   id: string;
   username: string;
   firstName: string;
   lastName: string;
   imageUrl: string;
   email?: string;
   createdAt?: string;
}

type Conversation = {
   conversationId: string;
   users?: string[];
   chats: {
      senderId: string;
      recieverId: string;
      seen: boolean;
      text: string[];
      sent: string;
   };
   conversationUser: CurrentUser;
};

type ChildrenType = { children?: React.ReactNode };

interface Clerkuser extends UserResource {}

interface MessageDetails {
   docId?: string;
   conversationId: string;
   user: { email: string; name: string; imgsrc: string };
   sender: { email: string; seen: boolean };
   message: string;
   sent: string;
}
