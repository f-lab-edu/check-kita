import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../shared/interfaces/user.interface';
import { INIT_AUTH_CONTEXT } from '../shared/constants/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}

// 기본값 없이 Context 생성
const AuthContext = createContext<AuthContextType>(INIT_AUTH_CONTEXT);

// Context를 쉽게 사용하기 위한 Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // TODO useMemo를 이용한 리팩토링 필요
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });

  const [user, setUser] = useState<User | undefined>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
