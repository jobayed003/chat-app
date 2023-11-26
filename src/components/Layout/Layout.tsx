import { Box, Flex, SystemStyleObject, useBreakpointValue } from '@chakra-ui/react';

type Props = {
   children: React.ReactNode;
   sx?: SystemStyleObject;
   flexOptions?: SystemStyleObject;
};

const Layout = (props: Props) => {
   return (
      <Box sx={props.sx} px={useBreakpointValue({ base: 1, md: 4, lg: 6 })}>
         <Flex justify={'space-around'} sx={props.flexOptions} flexDir={{ base: 'column', lg: 'row', sm: 'column' }}>
            {props.children}
         </Flex>
      </Box>
   );
};

export default Layout;
