'use client';
import { seenMessage } from '@actions/seenMessage';
import { Avatar, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/UI/Util/DynamicText';
import { useAuthState } from '@context/AuthProvider';
import { useAppState } from '@context/StateProvider';
import useConversationId from '@hooks/useConversationId';
import { compareDates } from '@libs/compareDates';

import { pusherClient } from '@libs/pusher';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useReducer, useState } from 'react';

type State = { lastSent: string; lastTextsLength: number; lastMessage: string; isSeen: boolean };

type Action = { type: 'ADD' | 'UPDATE'; payload: State };

const messageReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return { ...action.payload };
    case 'UPDATE':
      return {
        ...action.payload,
        lastTextsLength: state.lastTextsLength + action.payload.lastTextsLength,
      };
    default:
      return state;
  }
};

const ConversationDetails = ({ chats, conversationUser, conversationId }: ConversationDetails) => {
  const [state, dispatch] = useReducer(messageReducer, {
    lastSent: '',
    lastTextsLength: 0,
    lastMessage: '',
    isSeen: false,
  });
  const [isClicked, setIsClicked] = useState(false);

  const { lastSender, setLastSender } = useAppState();
  const { currentUser } = useAuthState();
  const router = useRouter();

  const { id } = useConversationId();

  const bgColor = useColorModeValue('#ddd', 'blue.800');

  const updateSeenStatus = async ({ id }: { id: string }) => {
    await seenMessage(id);
  };

  useEffect(() => {
    const messageHandler = async (data: MessageDetails) => {
      setLastSender(data.sender);

      const seenStatus = id ? true : data.seen;
      if (data.sender !== currentUser.id) {
        await updateSeenStatus({ id: conversationId });

        if (state.lastTextsLength > 0) {
          dispatch({
            type: 'ADD',
            payload: {
              lastMessage: data.message,
              lastSent: data.sent,
              lastTextsLength: 1,
              isSeen: seenStatus,
            },
          });
        } else {
          dispatch({
            type: 'UPDATE',
            payload: {
              lastMessage: data.message,
              lastSent: data.sent,
              lastTextsLength: 1,
              isSeen: seenStatus,
            },
          });
        }
      } else {
        dispatch({
          type: 'ADD',
          payload: { lastMessage: data.message, lastSent: data.sent, lastTextsLength: 1, isSeen: false },
        });
      }
    };

    if (id === conversationId) {
      pusherClient.subscribe(conversationId);
      pusherClient.bind('newMessage', messageHandler);
    }
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('newMessage', messageHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (chats) {
      setLastSender(chats.senderId);
      const lastMessage = chats.texts.at(-1)!;

      dispatch({
        type: 'ADD',
        payload: { lastTextsLength: chats.texts.length + 1, lastMessage, lastSent: chats.sent, isSeen: chats.seen },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box
      cursor={'pointer'}
      _hover={{ bg: bgColor }}
      bg={id && conversationId === id ? bgColor : ''}
      borderRadius={'5px'}
      px='.5rem'
      onClick={async () => {
        router.push(`/dashboard/messages/${conversationId}`);
        setIsClicked(true);

        !isClicked && (await updateSeenStatus({ id: conversationId }));
      }}
    >
      <Flex align={'center'} justify={'space-between'}>
        <Flex py='1rem' align={'center'} gap={'.8rem'} justify={'center'}>
          <Avatar name={conversationUser.username} src={conversationUser.imageUrl} size={'md'} />

          <Box>
            <DynamicText fontSize='1rem'>{conversationUser.username}</DynamicText>
            <DynamicText
              color={state.lastMessage && lastSender !== currentUser.id && !state.isSeen ? 'white' : 'gray'}
              fontSize='12px'
            >
              {chats.senderId === currentUser.id ? 'You: ' : ''}
              {chats.texts.length === 0
                ? 'Joined ' + compareDates(+conversationUser.createdAt!).difference.humanize() + ' ago'
                : chats.texts.at(-1)}
              {/* {lastSender === currentUser.id ? 'You: ' : ''} */}
              {/* {!state.lastMessage
                ? 'Joined ' + compareDates(+conversationUser.createdAt!).difference.humanize() + ' ago'
                : chats.texts.at(-1)} */}
            </DynamicText>

            {/* <DynamicText fontSize={'12px'} color={messageDetails.messageStatus === 'typing' ? '#2F9167' : 'gray'}>
                      {messageDetails.messageStatus === 'typing' ? 'Typing...' : messageDetails?.lastMessages}
                   </DynamicText> */}
          </Box>
        </Flex>
        <Flex direction={'column'} gap={'.5rem'}>
          <DynamicText fontSize='12px' color={lastSender !== currentUser.id && !state.isSeen ? 'white' : 'gray'}>
            {state.lastSent}
          </DynamicText>

          {state.lastMessage && !state.isSeen && !!state.lastTextsLength && lastSender !== currentUser.id && (
            <Flex
              bg={'#D34242'}
              borderRadius={'50%'}
              align={'center'}
              justify={'center'}
              alignSelf={'end'}
              w='15px'
              h='15px'
            >
              <DynamicText fontSize={'12px'} color={'#fff'}>
                {state.lastTextsLength - 1}
              </DynamicText>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

const MemoizeConversationDetails = memo(ConversationDetails);

export default MemoizeConversationDetails;
