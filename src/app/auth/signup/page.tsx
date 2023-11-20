import AuthLayout from '@Auth/AuthLayout';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   return { title: 'Signup | chatIT' };
}

const SignupPage = () => {
   return <AuthLayout />;
};

export default SignupPage;
