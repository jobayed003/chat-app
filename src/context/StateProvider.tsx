'use client';

import { messageDetailsInitState } from '@config/app';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface ContextType {
   isClicked: boolean;
   messageDetails: MessageDetails;
   isLoading: boolean;

   setIsClicked: Dispatch<SetStateAction<boolean>>;
   setIsLoading: Dispatch<SetStateAction<boolean>>;
   setMessageDetails: Dispatch<SetStateAction<MessageDetails>>;
}

const initContextType: ContextType = {
   isClicked: true,
   isLoading: false,
   messageDetails: messageDetailsInitState,

   setMessageDetails: () => {},
   setIsClicked: () => {},
   setIsLoading: () => {},
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [messageDetails, setMessageDetails] = useState(messageDetailsInitState);
   const [isLoading, setIsLoading] = useState(false);

   const [isClicked, setIsClicked] = useState<boolean>(false);

   useEffect(() => {}, []);

   const contextValue = {
      isClicked,
      messageDetails,
      isLoading,

      setIsLoading,
      setMessageDetails,
      setIsClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export default AppContext;
