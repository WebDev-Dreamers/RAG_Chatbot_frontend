import { create } from 'zustand';
import { getHistory, TChatbot } from '../api/chatbot';
import { IChatHistory } from '../types';

interface ChatbotState {
  chatHistory: IChatHistory;
  getChatHistory: (type: TChatbot) => Promise<IChatHistory>;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  chatHistory: {
    history: [],
    chats: [],
  },

  getChatHistory: async (type: TChatbot) => {
    const historyList = await getHistory(type);
    set({ chatHistory: historyList });
    return historyList;
  },
}));
