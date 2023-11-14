import { permanentRedirect } from 'next/navigation';

const DashboardPage = () => {
   permanentRedirect('/dashboard/messages');
};

export default DashboardPage;
