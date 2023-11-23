type User = {
   name: string;
   img: string;
   lastActive?: string;
   userId: string;
   messageDetails?: {
      messageStatus?: string;
      lastMessages?: string[];
      sent?: string;
   };
   status: string;
};

type ChildrenType = { children?: React.ReactNode };
