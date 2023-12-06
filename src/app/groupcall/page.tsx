import Call from '@components/UI/Call';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   return { title: 'ChatIT call' };
}

export default function HomePage() {
   return <Call />;
}
