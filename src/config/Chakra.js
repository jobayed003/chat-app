import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';

export function Chakra({ cookies, children }) {
   // b) Pass `colorModeManager` prop
   const colorModeManager =
      typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

   return <ChakraProvider colorModeManager={colorModeManager}>{children}</ChakraProvider>;
}
