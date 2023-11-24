'use client';

import { messageDetailsInitState } from '@config/app';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface ContextType {
   clicked: boolean;
   messageDetails: MessageDetails;

   setClicked: Dispatch<SetStateAction<boolean>>;
   setMessageDetails: Dispatch<SetStateAction<MessageDetails>>;
}

const initContextType: ContextType = {
   clicked: true,
   messageDetails: messageDetailsInitState,

   setMessageDetails: () => {},
   setClicked: () => {},
};

const AppContext = createContext<ContextType>(initContextType);

export const AppContextProvider = ({ children }: ChildrenType) => {
   const [messageDetails, setMessageDetails] = useState(messageDetailsInitState);

   const [clicked, setClicked] = useState<boolean>(false);

   useEffect(() => {}, []);

   const contextValue = {
      clicked,
      messageDetails,

      setMessageDetails,
      setClicked,
   };
   return <AppContext.Provider value={contextValue}>{children} </AppContext.Provider>;
};

export default AppContext;
