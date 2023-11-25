import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {};

const useConversationId = (props: Props) => {
   const [id, setId] = useState('');
   const params = useParams();
   const { conversationId } = params;

   useEffect(() => {
      setId(conversationId as string);
   }, [conversationId]);

   return { id };
};

export default useConversationId;
