import './globals.css';

export const metadata = {
  title: 'Chat App',
  description: 'Personal chatting app created by github user jobayed003',
  keywords: 'chat app, video calling app, javascript',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        {/* <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='mask-icon' href='/favicon.ico' color='#5bbad5' /> */}

        <link rel='shortcut icon' href='/static/favicon.ico' />
      </head>

      <body>{children}</body>
    </html>
  );
}
