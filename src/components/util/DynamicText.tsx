import { As, ResponsiveValue, Text, useColorModeValue } from '@chakra-ui/react';

type DynamicTextProps = {
   value: string | string[];
   color?: string;
   as?: As | undefined;
   m?: string;
   mb?: string;
   fontSize?: string;
   fontWeight?: string;
   textAlign?: ResponsiveValue<CanvasTextAlign> | undefined;
   order?: string;
};

const DynamicText = ({ value, color, fontSize, as, m, mb, fontWeight, textAlign, order }: DynamicTextProps) => {
   const textColor = useColorModeValue('colorMode.dark', 'colorMode.light');

   return (
      <Text
         as={as}
         textAlign={textAlign}
         m={m}
         color={color !== undefined ? color : textColor}
         fontSize={fontSize}
         fontWeight={fontWeight}
         order={order}
         mb={mb}
      >
         {value}
      </Text>
   );
};

export default DynamicText;
