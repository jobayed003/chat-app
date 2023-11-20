import { Text, TextProps, useColorModeValue } from '@chakra-ui/react';

const DynamicText = (props: TextProps) => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   return (
      <Text color={props.color !== undefined ? props.color : textColor} {...props}>
         {props.children}
      </Text>
   );
};

export default DynamicText;
