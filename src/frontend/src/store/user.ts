import { create } from "zustand";
import { User } from "../types/types";
import { getUserProfile } from "../actions/user";

type UserState = {
    user: User | null;
}

type UserActions = {
    setUser: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
    user: null,
    setUser: async () => {
        const user = await getUserProfile()
        set({ user })
    },
}))