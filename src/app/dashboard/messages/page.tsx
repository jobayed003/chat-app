import Messages from '@components/Layout/Messages';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const id = params.id;

   return { title: 'Message | chatIT' };
}

const MessagePage = async () => {
   return <Messages />;
};

export default MessagePage;
