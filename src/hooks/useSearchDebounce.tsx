import { useEffect, useState } from 'react';

type TValue<T> = T | undefined | string;

const useSearchDebounce = <T,>(delay = 350) => {
   const [search, setSearch] = useState<TValue<T>>('');
   const [searchQuery, setSearchQuery] = useState<TValue<T>>('');

   useEffect(() => {
      const delayFn = setTimeout(() => setSearch(searchQuery), delay);
      return () => clearTimeout(delayFn);
   }, [searchQuery, delay]);

   return [search, setSearchQuery];
};

export default useSearchDebounce;
