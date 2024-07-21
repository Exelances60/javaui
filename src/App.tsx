import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { LoadingSpinner } from "./components/loading";
import Layout from "./components/layout";
import { AuthProvider } from "./context/auth-contex";

const LoginLazy = React.lazy(() => import("./pages/Login/login"));
const RegisterLazy = React.lazy(() => import("./pages/Register/register"));
const HomeLazy = React.lazy(() => import("./pages/Home/home"));

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Suspense
            fallback={
              <div className="w-full h-screen justify-center items-center flex">
                <LoadingSpinner size={50} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<LoginLazy />} />
              <Route path="/register" element={<RegisterLazy />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<HomeLazy />} />
                <Route path="/profile" element={<div>Profile</div>} />
              </Route>
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Suspense>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
