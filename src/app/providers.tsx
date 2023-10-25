'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { AppStore } from '../context/StateProvider';
import { theme } from './theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <AppStore>
         <CacheProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
         </CacheProvider>
      </AppStore>
   );
};

export default Providers;
