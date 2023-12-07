import { Flex, Spinner, SpinnerProps } from '@chakra-ui/react';

const Spinners = (props: SpinnerProps) => {
   return (
      <Flex justify={'center'} align={'center'} height={'100vh'}>
         <Spinner size='xl' {...props} />
      </Flex>
   );
};

export default Spinners;
