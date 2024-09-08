/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingSpinner } from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";
import useCookies from "@/hooks/useCookies";
import { IJWTPayload } from "@/types/auth-types";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IAuthContext {
  user: { role: string } | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoggedIn: false,
  loading: true, // Yüklenme durumu
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [userContextData, setUserContextData] = useState<IJWTPayload | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCookie, setCookie, removeCookie } = useCookies();
  const { toast } = useToast();

  const getToken = useCallback(() => getCookie("token"), []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode<IJWTPayload>(token);
      setUserContextData(decoded);
      if (location.pathname === "/") {
        navigate("/home");
      }
      setIsLoggedIn(true);
    } else {
      if (location.pathname !== "/" && location.pathname !== "/register") {
        navigate("/");
      }
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, [getToken, navigate, location.pathname]);

  const login = (token: string) => {
    try {
      const decodedToken = jwtDecode<IJWTPayload>(token);
      if (!decodedToken.exp) throw new Error("Token has no expiration date");
      const expirationTimeMs = decodedToken.exp * 1000 - Date.now();
      setCookie("token", token, expirationTimeMs);
      toast({
        title: "Başarılı",
        description: "Başarıyla giriş yaptınız.",
        variant: "success",
      });
      setIsLoggedIn(true);
      navigate("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    removeCookie("token");
    setIsLoggedIn(false);
    queryClient.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full h-screen justify-center items-center flex">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user: userContextData,
        login,
        isLoggedIn,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};
