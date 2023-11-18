import Home from '@components/Heading/Home';

import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   return { title: 'Home | chatIT' };
}

export default function HomePage() {
   return <Home />;
}
