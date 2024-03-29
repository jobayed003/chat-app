import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
const colors = {
   colorMode: {
      dark: '#000',
      light: '#ddd',
   },
   colors: {
      brand: {
         100: '#f7fafc',
         900: '#1A202C',
      },
      primary: '#FB8E0B',
      secondary: 'rgba(253, 96, 3, 1)',
   },
   graytext: '#aaa',
   bgDark: '#aaa',
   bgWhite: '#F6F8FC',
   textDark: '#1A202C',
};

const borders = {
   light: '1px solid #EDF1F8',
   dark: '1px solid #000',
};

const config: ThemeConfig = {
   initialColorMode: 'dark',
   useSystemColorMode: false,
};

export const theme = extendTheme({ colors, borders, config });
