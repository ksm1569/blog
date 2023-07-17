import { create } from 'zustand';
import User from '../interfaces/User.interface';

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void;
}

const useStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => {
        set((state) => ({ ...state, user }));
    },
    removeUser: () => {
        set((state) => ({ ...state, user: null }));
    }
}))

export default useStore;