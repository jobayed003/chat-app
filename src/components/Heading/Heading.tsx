'use client';

import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Heading = () => {
  return (
    <>
      <Link href={'/about'}>
        <Button>Go to about</Button>
      </Link>
      <Link href={'/dashboard/messages'}>
        <Button>Go to dashboard</Button>
      </Link>
      {/* <Link href={'/dashboard/messages'}>
        <Button>Go to dashboard</Button>
      </Link> */}
    </>
  );
};

export default Heading;
