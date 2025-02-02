import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  timezone: string;
  active: boolean;
  roleAssignments: {
    roleId: string;
  }[];
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
};

/**
 * @name useAuthStore
 *
 * @description
 * This store is used to manage the user's authentication state.
 * By using the `persist` middleware, the state is saved in the local storage.
 */
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: !!accessToken }),
    }),
    { name: 'auth-storage' }
  )
);

export { useAuthStore };
