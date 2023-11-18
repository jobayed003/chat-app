import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const id = params.id;

   return { title: 'Settings | chatIT' };
}

const Settings = () => {
   return <div>Settings page</div>;
};

export default Settings;
