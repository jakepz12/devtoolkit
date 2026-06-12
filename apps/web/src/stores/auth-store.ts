import { create } from "zustand";

interface User {
  id: string;
  email: string;
  username: string;
  subscription_tier: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,

  login: (token: string, user: User) => {
    localStorage.setItem("token", token);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
    window.location.href = "/login";
  },

  setUser: (user: User) => set({ user }),
}));
