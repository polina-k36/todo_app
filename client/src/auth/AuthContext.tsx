import type { LoginData, RegisterData } from "@/types/auth.types";
import type { IEditInfoUser, IUser } from "@/types/user.types";
import { createContext } from "react";

interface IAuthContext {
    user: IUser | null;
    isAuthLoading: boolean;
    authError: string | null;
    logout: () => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    checkAuth: () => Promise<void>;
    updateCurrentUser: (data: IEditInfoUser) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);