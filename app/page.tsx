import { Inter } from 'next/font/google';
import Heading from './components/Heading/Heading';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <Heading />;
}
