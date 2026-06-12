import { create } from "zustand";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  technologies: string[];
  sort_order: number;
}

interface PortfolioSection {
  id: string;
  type: string;
  title: string;
  content: any;
  sort_order: number;
}

interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  bio: string;
  theme: string;
  slug: string;
  is_public: boolean;
  views_count: number;
  sections: PortfolioSection[];
  projects: Project[];
  created_at: string;
  updated_at: string;
}

interface PortfolioState {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  setPortfolios: (portfolios: Portfolio[]) => void;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  updatePortfolio: (id: string, data: Partial<Portfolio>) => void;
  removePortfolio: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolios: [],
  currentPortfolio: null,
  isLoading: false,
  error: null,

  setPortfolios: (portfolios) => set({ portfolios }),
  setCurrentPortfolio: (portfolio) => set({ currentPortfolio: portfolio }),
  addPortfolio: (portfolio) =>
    set((state) => ({ portfolios: [...state.portfolios, portfolio] })),
  updatePortfolio: (id, data) =>
    set((state) => ({
      portfolios: state.portfolios.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  removePortfolio: (id) =>
    set((state) => ({
      portfolios: state.portfolios.filter((p) => p.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
