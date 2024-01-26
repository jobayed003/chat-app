import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return { title: 'Message | chatIT' };
}

const MessagePage = () => {
  return null;
};

export default MessagePage;
