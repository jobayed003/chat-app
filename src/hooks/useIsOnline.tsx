import { useEffect, useState } from 'react';

export const useIsOnline = () => {
   const [isOnline, setIsOnline] = useState(false);

   let interval: string | number | NodeJS.Timeout | null | undefined = null;

   const InternetErrMessagenger = () => setIsOnline(navigator.onLine === true); // for do like this shortform

   useEffect(() => {
      interval = setInterval(InternetErrMessagenger, 6000);
      return () => {
         // @ts-ignore
         clearInterval(interval); // for component unmount stop the interval
      };
   }, []);

   return isOnline;
};
