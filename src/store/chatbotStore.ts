import { create } from 'zustand';
import { getAnswer, getHistory } from '../api/chatbot';
import { ChatType, IMessage, IChatHistory, IChatRequest } from '../types';

interface ChatbotState {
  chatHistory: IChatHistory;
  chatAnswer: IMessage;
  getChatHistory: (type: ChatType) => Promise<IChatHistory>;
  getChatAnswer: (request: IChatRequest) => Promise<IMessage>;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  chatHistory: {
    history: [],
    chats: [],
  },
  chatAnswer: {
    role: 'bot',
    content: '',
  },

  getChatHistory: async (type: ChatType) => {
    const historyList = await getHistory(type);
    set({ chatHistory: historyList });
    return historyList;
  },

  getChatAnswer: async (request: IChatRequest) => {
    const answer = await getAnswer({
      type: request.type,
      chatId: request.chatId,
      question: request.question,
    });
    set({ chatAnswer: answer });
    return answer;
  },
}));
