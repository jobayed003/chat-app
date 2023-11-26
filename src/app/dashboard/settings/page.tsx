import Settings from '@components/UI/Settings';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const id = params.id;

   return { title: 'Settings | chatIT' };
}

const SettingsPage = () => {
   return <Settings />;
};

export default SettingsPage;
