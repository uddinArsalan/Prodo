import { User } from "@/app/types";
import { create } from "zustand";
import { logout } from "@/app/actions/auth";

export type UserInfo = {
  userInfo: User | null;
  isLoggedIn: boolean;
  setUserInfo: (userInfo: User) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<UserInfo>()((set) => ({
  userInfo: null,
  isLoggedIn: false,
  setUserInfo: (userInfo: User) => set({ userInfo, isLoggedIn: true }),
  logout: async () => {
    set({ userInfo: null, isLoggedIn: false });
    await logout();
  },
}));
