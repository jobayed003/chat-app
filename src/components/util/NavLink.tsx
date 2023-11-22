import { useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import DynamicText from './DynamicText';

interface Props {
   children: React.ReactNode;
}

export const NavLink = (props: Props) => {
   const { children } = props;

   return (
      <Link href={'/' + children}>
         <DynamicText
            px={2}
            py={1}
            rounded={'md'}
            cursor={'pointer'}
            fontFamily={'DM Sans'}
            fontWeight={'500'}
            _hover={{
               bg: useColorModeValue('gray.200', 'gray.700'),
            }}
         >
            {children}
         </DynamicText>
      </Link>
   );
};

// export default NavLink;
