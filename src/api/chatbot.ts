import { ChatType, IMessage, IChatHistory, IChatRequest } from '../types';
import { httpClient } from './http';

export const getHistory = async (type: ChatType): Promise<IChatHistory> => {
  const response = await httpClient.get(`/chats?type=${type}`);
  return response.data;
};

export const getAnswer = async (params: IChatRequest): Promise<IMessage> => {
  const { type, chatId, question } = params;
  const response = await httpClient.post(`/chats/${chatId}?type=${type}`, question);
  return response.data;
};
