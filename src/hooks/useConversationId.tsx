import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {};

const useConversationId = (props: Props) => {
   const [id, setId] = useState('');
   const params = useParams();

   useEffect(() => {
      setId(params?.conversationId as string);
   }, [params?.conversationId]);

   return { id };
};

export default useConversationId;
