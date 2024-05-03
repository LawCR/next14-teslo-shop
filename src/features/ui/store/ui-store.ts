import { create } from 'zustand'

type Theme = "dark" | "light" | null;

interface State {
  // Sidebar state
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;

  // Dark mode state
  theme: Theme;
  setThemeMode: (theme: Theme) => void;
}

export const useUIStore = create<State>()((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  theme: null,
  setThemeMode: (theme: Theme) => set(state => ({ theme: theme })),
}))