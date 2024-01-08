interface CurrentUser {
   id: string;
   username: string;
   firstName: string;
   lastName: string;
   imageUrl: string;
   email?: string;
   createdAt?: string;
}

type ConversationDetails = {
   conversationId: string;
   users?: string[];
   chats: {
      senderId: string;
      seen: boolean;
      texts: string[];
      sent: string;
   };
   conversationUser: CurrentUser;
};

interface MessageDetails {
   docId?: string;
   conversationId: string;
   user: { email: string; name: string; imgsrc: string };
   sender: string;
   message: string;
   sent: string;
   seen: boolean;
}

type ChildrenType = { children?: React.ReactNode };
