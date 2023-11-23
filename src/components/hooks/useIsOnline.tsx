import { useEffect, useState } from 'react';

export const useIsOnline = () => {
   const [isOnline, setIsOnline] = useState(false);

   let interval = null;

   const InternetErrMessagenger = () => setIsOnline(navigator.onLine === true); // for do like this shortform

   useEffect(() => {
      interval = setInterval(InternetErrMessagenger, 6000); // call the function name only not with function with call `()`
      return () => {
         clearInterval(interval); // for component unmount stop the interval
      };
   }, []);

   return isOnline;
};
