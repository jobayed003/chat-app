'use client';

import { messageDetailsInitState } from '@config/app';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ContextType {
   isClicked: boolean;
   conversation: Conversation;
   messageDetails: MessageDetails;
   isLoading: boolean;

   setIsClicked: Dispatch<SetStateAction<boolean>>;
   setIsLoading: Dispatch<SetStateAction<boolean>>;
   setMessageDetails: Dispatch<SetStateAction<MessageDetails>>;
   setConversation: Dispatch<SetStateAction<Conversation>>;
}

const initConversation = {
   conversationId: '',
   chats: {
      senderId: '',
      recieverId: '',
      seen: false,
      text: [''],
      sent: '',
   },
   conversationUser: {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      imageUrl: '',
   },
};

const initContextType: ContextType = {
   isClicked: true,
   isLoading: false,
   conversation: initConversation,
   messageDetails: messageDetailsInitState,

   setMessageDetails: () => {},
   setConversation: () => {},
   setIsClicked: () => {},
   setIsLoading: () => {},
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [messageDetails, setMessageDetails] = useState(messageDetailsInitState);
   const [conversation, setConversation] = useState<Conversation>(initConversation);

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isClicked, setIsClicked] = useState<boolean>(true);

   const contextValue = {
      isClicked,
      messageDetails,
      isLoading,
      conversation,

      setConversation,
      setIsLoading,
      setMessageDetails,
      setIsClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export default AppContext;
