'use client';

import { createContext, ReactNode, useCallback, useReducer } from 'react';
import { Conversation, Message } from '@/types/chat';
import { MOCK_CONVERSATIONS, DEFAULT_MOCK_CONVERSATION } from '@/lib/mock-data';

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

export type ChatAction =
  | { type: 'CREATE_CONVERSATION'; payload: Conversation }
  | { type: 'SELECT_CONVERSATION'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: Message }
  | { type: 'DELETE_MESSAGE'; payload: { conversationId: string; messageId: string } }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'PIN_CONVERSATION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: ChatState = {
  conversations: [DEFAULT_MOCK_CONVERSATION, ...MOCK_CONVERSATIONS],
  currentConversationId: DEFAULT_MOCK_CONVERSATION.id,
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'CREATE_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id,
      };

    case 'SELECT_CONVERSATION':
      return {
        ...state,
        currentConversationId: action.payload,
        error: null,
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === state.currentConversationId
            ? { ...conv, messages: [...conv.messages, action.payload], updatedAt: new Date() }
            : conv
        ),
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === state.currentConversationId
            ? {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.id === action.payload.id ? action.payload : msg
                ),
                updatedAt: new Date(),
              }
            : conv
        ),
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: conv.messages.filter((msg) => msg.id !== action.payload.messageId),
                updatedAt: new Date(),
              }
            : conv
        ),
      };

    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter((conv) => conv.id !== action.payload),
        currentConversationId:
          state.currentConversationId === action.payload ? null : state.currentConversationId,
      };

    case 'PIN_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload ? { ...conv, isPinned: !conv.isPinned } : conv
        ),
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
}
