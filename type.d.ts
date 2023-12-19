interface CurrentUser {
   id: string;
   userName: string;
   firstName: string;
   lastName: string;
   imageUrl: string;
   emailAddress?: string;
   createdAt?: string;
}

type Conversation = {
   name: string;
   img: string;
   lastActive?: string;
   userId: string;
   email: string;
   currentUser: User;
   messageDetails?: {
      messageStatus?: string;
      lastMessage?: string;
      sent?: string;
   };
   status: string;
};

type ChildrenType = { children?: React.ReactNode };

interface Clerkuser extends UserResource {}

interface MessageDetails {
   docId?: string;
   id: string;
   user: { email: string; name: string; imgsrc: string };
   sender: { email: string; seen: boolean };
   message: string;
   sent: string;
}
