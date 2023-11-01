import AppContext from '@context/StateProvider';
import { permanentRedirect, redirect } from 'next/navigation';
import { useContext } from 'react';

const DashboardPage = () => {
   const { isAuthenticated } = useContext(AppContext);

   if (!isAuthenticated) redirect('/auth/login');

   permanentRedirect('/dashboard/messages');
};

export default DashboardPage;
