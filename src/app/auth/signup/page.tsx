import Auth from '@components/Auth/Auth';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   return { title: 'Signup | chatIT' };
}

const SignupPage = () => {
   return <Auth />;
};

export default SignupPage;
