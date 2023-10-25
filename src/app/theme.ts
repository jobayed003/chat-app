import { StyleFunctionProps, extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
const colors = {
   colorMode: {
      dark: '#000',
      light: '#eee',
   },
   'grayText': '#aaa',
};

const borders = {
   'light': '1px solid #ddd',
   'dark': '1px solid #000',
};

const buttonStyle = {};

const config: ThemeConfig = {
   initialColorMode: 'dark',
   useSystemColorMode: false,
};

// 3. extend the theme
export const theme = extendTheme({ colors, borders, config });
