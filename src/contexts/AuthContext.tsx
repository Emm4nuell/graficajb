import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type TokenPayload = {
  nome: string;
  perfil: string;
  id: string;
  email: string;
  exp: number;
};

type AuthContextType = {
  user: TokenPayload | null;
  token: string | null;
  isAuthenticated: boolean;
  perfilCandidato: boolean;
  isLoading: boolean;
  login: (token: string | null, nome?: string, email?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [perfilCandidato, setPerfilCandidato] = useState<boolean>(false);
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(storedToken);
        decoded.perfil == "CANDIDATO"
          ? setPerfilCandidato(true)
          : setPerfilCandidato(false);
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
    setIsLoading(false);
  }, []);

  const login = (newToken: string | null, nome?: string, email?: string) => {
    const decoded = jwtDecode<TokenPayload>(newToken ?? "");
    decoded.perfil == "CANDIDATO"
      ? setPerfilCandidato(true)
      : setPerfilCandidato(false);
    setToken(newToken);
    setUser({
      nome: nome ? nome : decoded.nome,
      perfil: decoded.perfil,
      id: decoded.id,
      email: email ? email : decoded.email,
      exp: decoded.exp,
    });
    localStorage.setItem("token", newToken ?? "");
    localStorage.setItem(
      "user",
      JSON.stringify({
        nome: nome ? nome : decoded.nome,
        perfil: decoded.perfil,
        id: decoded.id,
        email: email ? email : decoded.email,
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
      value={{
        user,
        token,
        isAuthenticated,
        perfilCandidato,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
