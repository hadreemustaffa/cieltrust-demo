import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEMO_ACCOUNT, LOCAL_STORAGE_KEY } from "../data/constants";
import { ERROR_MSG } from "../data/errorMessages";

interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  errorMessage: string;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  isAuthenticated: false,
  errorMessage: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { getItem } = useLocalStorage();

  const login = (data: User) => {
    const isDemoAccount =
      data.email === DEMO_ACCOUNT.email &&
      data.password === DEMO_ACCOUNT.password;
    const storedUsers = getItem(LOCAL_STORAGE_KEY) || "[]";

    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const isRegisteredUser = users.find(
      (user: User) =>
        user.email === data.email && user.password === data.password,
    );

    if (isDemoAccount || isRegisteredUser) {
      if (isDemoAccount) {
        setUser(DEMO_ACCOUNT);
      } else {
        setUser(isRegisteredUser);
      }
      setErrorMessage("");
      setIsAuthenticated(true);
      navigate("/dashboard/");
    } else {
      setErrorMessage(ERROR_MSG.INVALID_CREDENTIALS);
    }
  };

  const logout = () => {
    // removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
