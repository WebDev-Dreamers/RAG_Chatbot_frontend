import { useCallback, useEffect, useState } from 'react';
import { ChatType, IChatHistory, IHistory, IMessage } from '../types';
import { useChatbotStore } from '../store/chatbotStore';

export const useChat = (type: ChatType) => {
  const { getChatHistory, getSelectedChats, getChatAnswer } = useChatbotStore();

  const [history, setHistory] = useState<IHistory[]>([]);
  const [chats, setChats] = useState<IMessage[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: string) => {
    setError(error);
    setTimeout(() => setError(null), 2000);
  }, []);

  const fetchChatHistory = useCallback(async () => {
    setLoading(true);

    try {
      const res: IChatHistory = await getChatHistory(type);

      setHistory(res.history);
      setSelectedChatId(res.history[0].id);
      setChats(
        res.chats.map((chat) => ({
          role: chat.role,
          content: chat.content,
        }))
      );
    } catch (error) {
      handleError('히스토리를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [getChatHistory, type]);

  const fetchChats = useCallback(
    async (chatId: number) => {
      setLoading(true);

      try {
        const chats = await getSelectedChats({ type, chatId });
        setChats(
          chats.map((chat) => ({
            role: chat.role,
            content: chat.content,
          }))
        );
        setSelectedChatId(chatId);
      } catch (err) {
        handleError('채팅 내역을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [getSelectedChats, type]
  );

  const sendMessage = useCallback(
    async (question: string) => {
      if (selectedChatId === null) {
        handleError('선택된 채팅방이 없습니다.');
        return;
      }

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
        handleError('메시지 전송에 실패했습니다.');
      }
    },
    [getChatAnswer, type, history]
  );

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return { history, chats, selectedChatId, loading, error, fetchChats, sendMessage };
};
