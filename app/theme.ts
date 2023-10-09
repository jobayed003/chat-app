import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const customTheme = {
  borders: {
    side: '1px solid #ddd',
  },
  colors: {},
  fonts: {
    body: 'Roboto, Opens sans, sans-serif',
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
      },
      border: '1px solid #ddd',
    },
  },
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  breakpoints: {},
  spacing: {},
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ customTheme, config });

export default theme;
