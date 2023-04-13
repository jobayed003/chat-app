import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const customTheme = {
  colors: {},
  fonts: {
    body: 'Roboto, Opens sans, sans-serif',
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
      },
      a: {},
      ul: {},
      h1: {},
      p: {},
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
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ customTheme, config });

export default theme;
