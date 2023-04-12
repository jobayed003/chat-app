import './globals.css';

export const metadata = {
  title: 'Chat App',
  description: 'Personal chatting app created by github user jobayed003',
  keywords: ['chat app', 'video calling app', 'javascript'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
