import { LoadingSpinner } from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";
import useCookies from "@/hooks/useCookies";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  loading: true, // Yüklenme durumu
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCookie, setCookie, removeCookie } = useCookies();
  const { toast } = useToast();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      if (location.pathname !== "/" && location.pathname !== "/register") {
        navigate("/");
      }
    } else {
      if (location.pathname === "/") {
        navigate("/home");
      }
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [getCookie, navigate, location.pathname]);

  const login = (token: string) => {
    try {
      const decodedToken = jwtDecode(token);
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

export const useAuth = () => useContext(AuthContext);
