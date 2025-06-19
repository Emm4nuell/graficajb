import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type TokenPayload = {
  nome: string;
  perfil: string;
  exp: number;
};

type AuthContextType = {
  user: TokenPayload | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<TokenPayload | null>(null);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
  }, []);

  const login = (newToken: string) => {
    const decoded = jwtDecode<TokenPayload>(newToken);
    setToken(newToken);
    setUser(decoded);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user",
        JSON.stringify({
        nome: decoded.nome,
        perfil: decoded.perfil,
        exp: decoded.exp,
        })
  );
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
