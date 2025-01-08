export type ChatType = 'study' | 'custom';

export type ChatRole = 'user' | 'bot';

export interface IHistory {
  id: number;
  title: string;
  updatedAt: string;
}

export interface IChat {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface IChatHistory {
  history: IHistory[];
  chats: IChat[];
}

export interface IMessage {
  role: ChatRole;
  content: string;
}

export interface IChatRequest {
  type: ChatType;
  question: string;
}
