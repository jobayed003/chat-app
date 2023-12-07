import MakeCall from '@components/UI/MakeCall';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   return { title: 'ChatIT call' };
}

export default function HomePage() {
   return <MakeCall />;
}
