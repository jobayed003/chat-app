import Messages from '@components/Layout/Messages';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return <Messages>{children}</Messages>;
};

export default RootLayout;
