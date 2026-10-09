import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { type AuthResponse } from './authApi';

interface AuthUser {
    id: string;
    name: string;
    email: string;
    mobile: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (auth: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('authUser');
        const token = localStorage.getItem('accessToken');
        if (stored && token) {
            setUser(JSON.parse(stored));
        }
        setIsLoading(false);
    }, []);

    const login = (auth: AuthResponse) => {
        localStorage.setItem('accessToken', auth.accessToken);
        localStorage.setItem('authUser', JSON.stringify(auth.data));
        setUser(auth.data);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}