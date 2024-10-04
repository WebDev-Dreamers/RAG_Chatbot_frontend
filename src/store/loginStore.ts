import { create } from "zustand";

interface LoginState {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set) => ({
  isLogin: false,
  setIsLogin: (value) => set(() => ({ isLogin: value })),
  logout: () => set(() => ({ isLogin: false })),
}));

export default useLoginStore;
