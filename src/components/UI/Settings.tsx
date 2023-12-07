'use client';

import { Flex } from '@chakra-ui/react';
import DynamicButton from '@components/UI/DynamicButton';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

type Props = {};

const Settings = (props: Props) => {
   return (
      <Link href='/dashboard/messages'>
         <Flex justify={'center'} align='center' h='100vh'>
            <DynamicButton>
               <FaArrowLeft /> Back to messages
            </DynamicButton>
         </Flex>
      </Link>
   );
};

export default Settings;
