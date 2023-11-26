'use client';

import DynamicButton from '@components/util/DynamicButton';
import Link from 'next/link';

type Props = {};

const Settings = (props: Props) => {
   return (
      <Link href='/dashboard/messages'>
         <DynamicButton>Back to messages</DynamicButton>
      </Link>
   );
};

export default Settings;
