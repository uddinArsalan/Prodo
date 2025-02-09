import { User } from "@/app/types";
import { create } from "zustand";
import { logout } from "@/app/actions/auth";

export type UserInfo = {
  userInfo: User | null;
  isLoggedIn: boolean;
};

export const initialState: UserInfo = {
  userInfo: null,
  isLoggedIn: false,
};

export const useAuthStore = create<UserInfo>()((set) => ({
  userInfo: null,
  isLoggedIn: false,
  setUserInfo: (userInfo: User) => set({ userInfo, isLoggedIn: true }),
  logout: async () => {
    await logout();
    set({ userInfo: null, isLoggedIn: false });
  },
}));
