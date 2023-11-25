type User = {
   name: string;
   img: string;
   lastActive?: string;
   userId: string;
   messageDetails?: {
      messageStatus?: string;
      lastMessage?: string;
      sent?: string;
   };
   status: string;
};

type ChildrenType = { children?: React.ReactNode };

interface MessageDetails {
   id: string;
   user: { email: string; name: string; imgsrc: string };
   sender: { email: string; seen: boolean };
   message: string;
   sent: string;
}
