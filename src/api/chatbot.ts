import { ChatType } from '../types';
import { httpClient } from './http';

export const getHistory = async (type: ChatType) => {
  const response = await httpClient.get(`/chats?type=${type}`);
  return response.data;
};
