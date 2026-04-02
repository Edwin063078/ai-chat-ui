'use client';

import { useContext, useCallback } from 'react';
import { ChatContext, ChatAction } from '@/app/providers';
import { Conversation, Message } from '@/types/chat';
// Simple UUID generator for client-side use
const generateId = () => Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

export function useChat() {
  const { state, dispatch } = useContext(ChatContext);

  const currentConversation = state.conversations.find(
    (conv) => conv.id === state.currentConversationId
  );

  const createNewConversation = useCallback((title?: string) => {
    const conversation: Conversation = {
      id: generateId(),
      title: title || 'New Conversation',
      messages: [],
      model: 'claude-opus-4-6',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    };
    dispatch({ type: 'CREATE_CONVERSATION', payload: conversation });
    return conversation;
  }, [dispatch]);

  const selectConversation = useCallback((id: string) => {
    dispatch({ type: 'SELECT_CONVERSATION', payload: id });
  }, [dispatch]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!state.currentConversationId) return;

    const fullMessage: Message = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: fullMessage });
    return fullMessage;
  }, [dispatch, state.currentConversationId]);

  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      if (!currentConversation) return;

      const message = currentConversation.messages.find((msg) => msg.id === messageId);
      if (!message) return;

      const updatedMessage = { ...message, ...updates };
      dispatch({ type: 'UPDATE_MESSAGE', payload: updatedMessage });
      return updatedMessage;
    },
    [dispatch, currentConversation]
  );

  const deleteMessage = useCallback(
    (messageId: string) => {
      if (!state.currentConversationId) return;
      dispatch({
        type: 'DELETE_MESSAGE',
        payload: { conversationId: state.currentConversationId, messageId },
      });
    },
    [dispatch, state.currentConversationId]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_CONVERSATION', payload: id });
    },
    [dispatch]
  );

  const pinConversation = useCallback(
    (id: string) => {
      dispatch({ type: 'PIN_CONVERSATION', payload: id });
    },
    [dispatch]
  );

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    [dispatch]
  );

  const setError = useCallback(
    (error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
    [dispatch]
  );

  return {
    state,
    currentConversation,
    createNewConversation,
    selectConversation,
    addMessage,
    updateMessage,
    deleteMessage,
    deleteConversation,
    pinConversation,
    setLoading,
    setError,
  };
}
