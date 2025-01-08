import { useCallback, useEffect, useState } from 'react';
import { ChatType, IChatHistory, IHistory, IMessage } from '../types';
import { useChatbotStore } from '../store/chatbotStore';

export const useChat = (type: ChatType) => {
  const { getChatHistory } = useChatbotStore();

  const [history, setHistory] = useState<IHistory[]>([]);
  const [chats, setChats] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChatHistory = useCallback(async () => {
    setLoading(true);

    try {
      const res: IChatHistory = await getChatHistory(type);

      setHistory(res.history);
      setChats(
        res.chats.map((chat) => ({
          role: chat.role,
          content: chat.content,
        }))
      );
    } finally {
      setLoading(false);
    }
  }, [getChatHistory, type]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return { history, chats, loading };
};
