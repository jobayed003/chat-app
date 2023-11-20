import AuthLayout from '@Auth/AuthLayout';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
   params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const id = params.id;
   // const router = ();

   return { title: 'Login | chatIT' };
}

const LoginPage = () => {
   return <AuthLayout />;
};

export default LoginPage;
