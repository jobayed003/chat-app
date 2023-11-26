import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const id = params.id;

   return { title: 'Settings | chatIT' };
}

const Settings = () => {
   return <Settings />;
};

export default Settings;
