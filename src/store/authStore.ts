import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, logout } from '../api/auth';
import { LoginRequest } from '../types/auth';
interface AuthState {
  isLogin: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: null,
      loading: false,
      error: null,

      login: async (data: LoginRequest) => {
        set({ loading: true });
        try {
          const response = await login(data);
          set({
            isLogin: true,
            accessToken: response.accessToken,
            loading: false,
          });

          localStorage.setItem('accessToken', response.accessToken);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || '로그인 실패',
            loading: false,
          });
          setTimeout(() => set({ error: null }), 2000);
        }
      },

      logout: async () => {
        await logout();
        set({ isLogin: false, accessToken: null });
        localStorage.removeItem('accessToken');
      },

      setIsLoggedIn: (status: boolean) => {
        set({ isLogin: status });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLogin: state.isLogin, accessToken: state.accessToken }),
    }
  )
);
