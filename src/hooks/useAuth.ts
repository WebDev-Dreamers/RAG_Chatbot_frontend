import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { isLogin, accessToken, loading, error, login, logout } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await login({ email, password });
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    isLogin,
    accessToken,
    error,
    loading,
    handleLogin,
    handleLogout,
  };
};
