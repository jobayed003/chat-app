type User = {
   name: string;
   img: string;
   lastActive: string;
   messageDetails: {
      messageStatus: string;
      lastMessages: string[];
      sent: string;
   };
   status: string;
};
