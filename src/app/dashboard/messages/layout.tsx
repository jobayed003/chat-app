import Messages from '@components/Messages/Messages';
import React from 'react';

const RootLayout = ({ children }: ChildrenType) => {
   return <Messages>{children}</Messages>;
};

export default RootLayout;
