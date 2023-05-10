import { createContext, ReactNode, useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

type authContextType = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: (user: string) => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useLocalStorage<string|null>("user", null);

    const login = (user: string) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}