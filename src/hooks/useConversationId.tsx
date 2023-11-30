import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversationId = () => {
   const params = useParams();

   const id = useMemo(() => {
      if (!params?.conversationId) {
         return '';
      }

      return params.conversationId as string;
   }, [params?.conversationId]);

   return { id };
};

export default useConversationId;
