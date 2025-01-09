import { LoginRequest, LoginResponse } from '../types/auth';
import { httpClient } from './http';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post('/users/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await httpClient.post('/users/logout');
};
