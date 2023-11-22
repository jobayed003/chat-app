import { Box, Flex, SystemStyleObject } from '@chakra-ui/react';

type Props = {
   children: React.ReactNode;
   sx?: SystemStyleObject;
   flexOptions?: SystemStyleObject;
};

const Layout = (props: Props) => {
   return (
      <Box sx={props.sx} px={4}>
         <Flex justify={'space-around'} sx={props.flexOptions}>
            {props.children}
         </Flex>
      </Box>
   );
};

export default Layout;
