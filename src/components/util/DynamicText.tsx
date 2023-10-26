import { As, Text, useColorModeValue } from '@chakra-ui/react';

type DynamicText = {
   value: string | string[];
   color?: string;
   as?: As | undefined;
   m?: string;
   fontSize?: string;
   fontWeight?: string;
};

const DynamicText = ({ value, color, fontSize, as, m, fontWeight }: DynamicText) => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   return (
      <Text
         as={as}
         m={m}
         color={color !== undefined ? color : textColor}
         fontSize={fontSize}
         fontWeight={fontWeight}
      >
         {value}
      </Text>
   );
};

export default DynamicText;
