import { useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import DynamicText from './DynamicText';

export const NavLink = (props: ChildrenType) => {
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
