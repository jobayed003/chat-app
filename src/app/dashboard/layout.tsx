import Dashboard from '@components/Layout/Dashboard';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return <Dashboard>{children}</Dashboard>;
};

export default RootLayout;
