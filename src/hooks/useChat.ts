import { useEffect, useState } from 'react';
import { IChatHistory } from '../types';
import { useChatbotStore } from '../store/chatbotStore';

export const useChat = (chatbotType: 'study' | 'convention') => {
  const { chatAnswer, chatHistory, getChatAnswer, getChatHistory } = useChatbotStore();

  const [chats, setChats] = useState<IChatHistory[]>([
    {
      who: 'bot',
      message: '안녕하세요. Simple Chatbot 입니다. 무엇을 도와드릴까요?',
    },
  ]);

  const handleSendMessage = async (question: string): Promise<void> => {
    const userChat: IChatHistory = { who: 'user', message: question };
    setChats((prevChats) => [...prevChats, userChat]);

    await getChatAnswer({ chatbotType, question });

    if (chatAnswer) {
      const botChat: IChatHistory = { who: 'bot', message: chatAnswer };
      setChats((prevChats) => [...prevChats, botChat]);
    }
  };

  useEffect(() => {
    if (chatHistory.length === 0) {
      getChatHistory(chatbotType).then((history) => {
        const contents: IChatHistory[] = history.map((chat) => ({
          who: chat.who,
          message: chat.message,
        }));
        setChats((prevChats) => [...prevChats, ...contents]);
      });
    }
  }, [getChatHistory, chatHistory.length]);

  return { chats, handleSendMessage };
};
