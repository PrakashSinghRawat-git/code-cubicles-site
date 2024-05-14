import { create } from "zustand";

export const globalStore = create((set) => ({
    userInfo: {
        name: null,
        email: null,
        photoURL: null,
    },
    setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
}));
