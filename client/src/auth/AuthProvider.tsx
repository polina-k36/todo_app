import { tokenStorage } from "@/api/token";
import type { LoginData, RegisterData } from "@/types/auth.types";
import type { IEditInfoUser, IUser } from "@/types/user.types";
import { useEffect, useState, type ReactNode } from "react";
import { getProfileInfo, login as loginApi, register as registerApi, updateInfoProfile } from "@/api/auth";
import { AuthContext } from "./AuthContext";
interface IAuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({children}: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(() => {
        return tokenStorage.get() ? true : false
    });


    const logout = async () => {
        tokenStorage.remove();
        setUser(null);
        setAuthError(null);
        setIsAuthorized(false);
    }

    const login = async (data: LoginData) => {
        const response = await loginApi(data);

        tokenStorage.set(response.accessToken);
        setUser(response.user);
        setAuthError(null);
        setIsAuthorized(true);
    }

    const register = async (data: RegisterData) => {
        const response = await registerApi(data);

        tokenStorage.set(response.accessToken);
        setUser(response.user);
        setAuthError(null);
        setIsAuthorized(true);
    }

    const checkAuth = () => {
        const token = tokenStorage.get();
        if (!token) {
            setIsAuthLoading(false);
            logout();
            return Promise.resolve();
        }
        setAuthError(null);
        setIsAuthLoading(true);

        return getProfileInfo()
            .then(data => {
                setUser(data.data);
                setIsAuthorized(true);
            })
            .catch(e => {
                if (e.statusCode === 401 || e.statusCode === 403) {
                    logout();
                    return;
                }
                setAuthError('Не удалось проверить авторизацию');
                
            })
            .finally(() => {
                setIsAuthLoading(false);
            });  
    }

    const updateCurrentUser = async (data: IEditInfoUser) => {
        const response = await updateInfoProfile(data);

        setUser(response.data);
    };

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{
            user, 
            isAuthLoading, 
            authError,
            isAuthorized,
            login, 
            logout, 
            register,
            checkAuth,
            updateCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;