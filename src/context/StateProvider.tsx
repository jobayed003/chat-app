'use client';

import { messageDetailsInitState } from '@config/app';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface ContextType {
   lastSender: string;
   isClicked: boolean;
   conversation: ConversationDetails;
   messageDetails: MessageDetails;
   isLoading: boolean;

   setLastSender: Dispatch<SetStateAction<string>>;
   setIsClicked: Dispatch<SetStateAction<boolean>>;
   setIsLoading: Dispatch<SetStateAction<boolean>>;
   setMessageDetails: Dispatch<SetStateAction<MessageDetails>>;
   setConversation: Dispatch<SetStateAction<ConversationDetails>>;
}

const initConversation = {
   conversationId: '',
   chats: {
      senderId: '',
      recieverId: '',
      seen: false,
      texts: [''],
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
   lastSender: '',
   isClicked: false,
   isLoading: false,
   conversation: initConversation,
   messageDetails: messageDetailsInitState,

   setMessageDetails: () => {},
   setConversation: () => {},
   setIsClicked: () => {},
   setLastSender: () => {},
   setIsLoading: () => {},
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [messageDetails, setMessageDetails] = useState(messageDetailsInitState);
   const [conversation, setConversation] = useState<ConversationDetails>(initConversation);
   const [lastSender, setLastSender] = useState<string>('');

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isClicked, setIsClicked] = useState<boolean>(false);

   const contextValue = {
      isClicked,
      messageDetails,
      isLoading,
      conversation,
      lastSender,

      setLastSender,
      setConversation,
      setIsLoading,
      setMessageDetails,
      setIsClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export const useAppState = () => {
   return useContext(AppContext);
};
