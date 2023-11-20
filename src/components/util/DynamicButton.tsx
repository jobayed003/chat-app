import { Button, ButtonProps } from '@chakra-ui/react';

const DynamicButton = (props: ButtonProps) => {
   return (
      <Button
         display={{ base: 'none', md: 'inline-flex' }}
         fontSize={'sm'}
         fontWeight={600}
         color={'white'}
         bg={'colors.primary'}
         _hover={{
            bg: 'colors.primary',
         }}
         {...props}
      >
         {props.children}
      </Button>
   );
};

export default DynamicButton;
