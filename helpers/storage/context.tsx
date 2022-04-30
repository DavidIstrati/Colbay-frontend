import { createContext, ReactNode, useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export type userProps = {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    institution: string;
    graduationYear: string;
    verifiedEmail: boolean;
}

type authContextType = {
  user: userProps | null;
  login: (user: userProps) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: (user: userProps) => {},
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
    const [user, setUser] = useLocalStorage<userProps|null>("user", null);

    const login = (user: userProps) => {
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