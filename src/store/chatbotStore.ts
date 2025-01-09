import { create } from 'zustand';
import { getAnswer, getChats, getHistory } from '../api/chatbot';
import { ChatType, IMessage, IChatHistory, IChatRequest, IChat, ICurrentChat } from '../types';

interface ChatbotState {
  chatHistory: IChatHistory;
  selectedChats: IChat[];
  chatAnswer: IMessage;
  getChatHistory: (type: ChatType) => Promise<IChatHistory>;
  getSelectedChats: (params: ICurrentChat) => Promise<IChat[]>;
  getChatAnswer: (request: IChatRequest) => Promise<IMessage>;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  chatHistory: {
    history: [],
    chats: [],
  },
  selectedChats: [],
  chatAnswer: {
    role: 'bot',
    content: '',
  },

  getChatHistory: async (type: ChatType) => {
    const historyList = await getHistory(type);
    set({ chatHistory: historyList });
    return historyList;
  },

  getSelectedChats: async (params: ICurrentChat) => {
    const currChats = await getChats(params);
    set({ selectedChats: currChats });
    return currChats;
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
