import { Text, TextProps, useColorModeValue } from '@chakra-ui/react';

interface DynamicTextProps extends TextProps {
   // value: string | string[];
   // color?: string;
}

const DynamicText = (props: DynamicTextProps) => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   return (
      <Text color={props.color !== undefined ? props.color : textColor} {...props}>
         {props.children}
      </Text>
   );
};

export default DynamicText;
