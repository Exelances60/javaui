import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/routes";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
