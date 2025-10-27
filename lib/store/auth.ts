import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  expiresAt: number | null;
  login: (durationMs: number) => void;
  logout: () => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      expiresAt: null,
      login: (durationMs: number) => {
        const expiresAt = Date.now() + durationMs;
        set({ isAuthenticated: true, expiresAt });
      },
      logout: () => set({ isAuthenticated: false, expiresAt: null }),
      reset: () => set({ isAuthenticated: false, expiresAt: null }),
    }),
    {
      name: "auth",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        expiresAt: state.expiresAt,
      }),
    }
  )
);


