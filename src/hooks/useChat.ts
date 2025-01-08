import { useCallback, useEffect, useState } from 'react';
import { ChatType, IChatHistory, IHistory, IMessage } from '../types';
import { useChatbotStore } from '../store/chatbotStore';

export const useChat = (type: ChatType) => {
  const { getChatHistory, getChatAnswer } = useChatbotStore();

  const [history, setHistory] = useState<IHistory[]>([]);
  const [chats, setChats] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const sendMessage = useCallback(
    async (question: string) => {
      const userChat: IMessage = { role: 'user', content: question };
      setChats((prevChats) => [...prevChats, userChat]);

      try {
        const answer = await getChatAnswer({ type, chatId: history[0]?.id || 0, question });

        if (answer) {
          const botChat: IMessage = {
            role: answer.role,
            content: answer.content,
          };
          setChats((prevChats) => [...prevChats, botChat]);
        }
      } catch (error) {
        setError('메시지 전송에 실패했습니다.');
        console.error('메시지 전송에 실패했습니다.', error);
      }
    },
    [getChatAnswer, type, history]
  );

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return { history, chats, loading, error, sendMessage };
};
