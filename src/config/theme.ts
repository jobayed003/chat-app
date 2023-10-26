import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
const colors = {
   colorMode: {
      dark: '#000',
      light: '#eee',
   },
   'grayText': '#aaa',
   bgColor: '#F6F8FC',
};

const borders = {
   'light': '1px solid #EDF1F8',
   'dark': '1px solid #000',
};

const config: ThemeConfig = {
   initialColorMode: 'dark',
   useSystemColorMode: false,
};

// 3. extend the theme
export const theme = extendTheme({ colors, borders, config });