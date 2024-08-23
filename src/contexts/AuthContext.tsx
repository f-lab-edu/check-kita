import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../shared/interfaces/user.interface';
import { INIT_AUTH_CONTEXT } from '../shared/constants/constants';

interface AuthContextType {
  isLogin: boolean;
  user?: User;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(INIT_AUTH_CONTEXT);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
  };

  return <AuthContext.Provider value={{ isLogin, login, logout }}>{children}</AuthContext.Provider>;
};
